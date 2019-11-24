
import { Action, StateContext, State, Selector } from '@ngxs/store';

import { StateStorageModel } from './storage.state.model';
import {
    ActionStorageGetUrl,
    ActionStorageGetUrls
} from './storage.actions';
import { StateStorageOptions } from './storage.state.options';
import { StorageImage } from '@theory/firebase/interfaces';
import { tap, filter, map } from 'rxjs/operators';
import { Observable, forkJoin, of, combineLatest } from 'rxjs';
import { ServiceStorage } from '@theory/firebase/services';
import { ImageSize } from '@theory/firebase/enums';

@State<StateStorageModel>(StateStorageOptions)

export class StateStorage
{
    @Selector() static image(state: StateStorageModel):  StorageImage                 {return state.image;}
    @Selector() static images(state: StateStorageModel): Record<string, StorageImage> {return state.images;}

    public static image$(images$: Observable<Record<string, StorageImage>>, bucketPath$: Observable<string>, size: ImageSize = ImageSize.Medium): Observable<string>
    {
        return combineLatest([images$, bucketPath$]).
        pipe
        (
            filter(([images, bucketPath]) => images[bucketPath] != null),
            map(([images, bucketPath]) => images[bucketPath][size])
        );
    }

    constructor(private service: ServiceStorage) { }

    @Action(ActionStorageGetUrl)
    getUrl({ getState, patchState }: StateContext<StateStorageModel>, { bucketPath, size, cached }: ActionStorageGetUrl)
    {
        const images: Record<string, StorageImage> = StateStorage.images(getState());
        const exists: boolean                      = images[bucketPath] != null && images[bucketPath][size] != null;
        const image:  StorageImage                 = exists ? images[bucketPath] : {};

        return exists && !cached ?
            of(null) :
            this.service.
                downloadUrl(bucketPath, size).
                pipe
                (
                    tap((url: string) =>
                        image[size] = url
                    ),
                    tap(() =>
                        images[bucketPath] = image
                    ),
                    tap(() =>
                        patchState({ images, image })
                    )
                );
    }

    @Action(ActionStorageGetUrls)
    getUrls({ getState, patchState }: StateContext<StateStorageModel>, { bucketPaths, size, cached })
    {
        const images: Record<string, StorageImage> = StateStorage.images(getState());

        const urls$: Array<Observable<string>> =

        bucketPaths.
        filter((bucketPath: string) =>
            !cached || images[bucketPath] == null || images[bucketPath][size] == null
        ).
        map((bucketPath: string) =>
            this.service.downloadUrl(bucketPath, size).
            pipe
            (
                tap((url: string) =>
                    images[bucketPath] =
                    {
                        ...images[bucketPath],
                        [size]: url
                    }
                )
            )
        );

        return urls$.length === 0 ?
            of(null) :
            forkJoin(urls$).pipe
            (
                tap(() => patchState({ images }))
            );
    }
}
