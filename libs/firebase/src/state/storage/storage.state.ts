
import { Action, StateContext, State, Selector } from '@ngxs/store';

import { StateStorageModel } from './storage.state.model';
import {
    ActionStorageGetUrl,
    ActionStorageGetUrls
} from './storage.actions';
import { StateStorageOptions } from './storage.state.options';
import { StorageImage } from '@theory/firebase/interfaces';
import { ServiceStorage } from '@theory/firebase/services';
import { tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@State<StateStorageModel>(StateStorageOptions)

export class StateStorage
{
    @Selector() static images(state: StateStorageModel): Record<string, StorageImage> {return state.images;}

    constructor(private service: ServiceStorage) { }

    @Action(ActionStorageGetUrl)
    getUrl({ getState, patchState }: StateContext<StateStorageModel>, { bucketPath, size }: ActionStorageGetUrl)
    {
        const images: Record<string, StorageImage> = StateStorage.images(getState());
        const image:  StorageImage                 = images[bucketPath] == null ? {} : images[bucketPath];

        return this.service.
            getDownloadUrl(bucketPath, size).
            pipe
            (
                tap((url: string) =>
                    image[size] = url
                ),
                tap(() =>
                    images[bucketPath] = image
                ),
                tap(() =>
                    patchState({ images })
                )
            );
    }

    @Action(ActionStorageGetUrls)
    getUrls({ getState, patchState }: StateContext<StateStorageModel>, { bucketPaths, size })
    {
        const images: Record<string, StorageImage> = StateStorage.images(getState());

        bucketPaths.
        filter((bucketPath: string) =>
            images[bucketPath] == null
        ).
        forEach((bucketPath: string) =>
            images[bucketPath] = {}
        );

        const urls$: Observable<string> =

        bucketPaths.
            map((bucketPath: string) =>
                this.service.
                getDownloadUrl(bucketPath, size).
                pipe(tap((url: string) => images[bucketPath][size] = url))
            );

        return forkJoin(urls$).pipe
        (
            tap(() => patchState({ images }))
        );
    }
}
