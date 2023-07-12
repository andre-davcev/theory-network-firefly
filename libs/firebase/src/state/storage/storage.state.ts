import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/compat/storage';
import { Observable, forkJoin, of } from 'rxjs';
import {
  catchError,
  filter,
  last,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ImageSize, StorageFormat } from '../../enums';
import { StorageImage } from '../../interfaces';
import { ServiceStorage } from '../../services';
import {
  ActionStorageUpload,
  ActionStorageUploadClear,
  ActionStorageUrlGet,
  ActionStorageUrlSet,
  ActionStorageUrlsGet
} from './storage.actions';
import { StateStorageModel } from './storage.state.model';
import { StateStorageOptions } from './storage.state.options';

@State<StateStorageModel>(StateStorageOptions)
@Injectable()
export class StateStorage {
  @Selector() static images(
    state: StateStorageModel
  ): Record<string, StorageImage> {
    return state.images;
  }

  @Selector() static uploadProgress(state: StateStorageModel): number {
    return state.uploadProgress;
  }
  @Selector() static uploadError(state: StateStorageModel): string {
    return state.uploadError;
  }
  @Selector() static uploadErrored(state: StateStorageModel): boolean {
    return state.uploadError != null;
  }
  @Selector() static uploadCompleted(state: StateStorageModel): boolean {
    return StateStorage.uploadProgress(state) === 100;
  }

  constructor(
    private service: ServiceStorage,
    private storage: AngularFireStorage
  ) {}

  @Action(ActionStorageUrlGet)
  getUrl(
    { getState, patchState }: StateContext<StateStorageModel>,
    { bucketPath, size, cached }: ActionStorageUrlGet
  ) {
    const images: Record<string, StorageImage> = StateStorage.images(
      getState()
    );
    const image: StorageImage =
      images[bucketPath] == null ? {} : images[bucketPath];
    const exists: boolean = image[size] != null;

    images[bucketPath] = image;

    patchState({ images });

    return exists && !cached
      ? of(null)
      : this.service.downloadUrl(bucketPath, size).pipe(
          withLatestFrom(of(StateStorage.images(getState()))),
          map(([url, images]) => {
            images[bucketPath][size] = url;
            images[bucketPath][ImageSize.Small] = url;

            return images;
          }),
          tap((images: Record<string, StorageImage>) => patchState({ images }))
        );
  }

  @Action(ActionStorageUrlsGet)
  getUrls(
    { getState, patchState }: StateContext<StateStorageModel>,
    { bucketPaths, size, cached }
  ) {
    const images: Record<string, StorageImage> = StateStorage.images(
      getState()
    );

    const urls$: Array<Observable<string>> = bucketPaths
      .filter(
        (bucketPath: string) =>
          !cached ||
          images[bucketPath] == null ||
          images[bucketPath][size] == null
      )
      .map((bucketPath: string) =>
        this.service.downloadUrl(bucketPath, size).pipe(
          tap(
            (url: string) =>
              (images[bucketPath] = {
                ...images[bucketPath],
                [size]: url
              })
          )
        )
      );

    return urls$.length === 0
      ? of(null)
      : forkJoin(urls$).pipe(tap(() => patchState({ images })));
  }

  @Action(ActionStorageUrlSet)
  setUrl(
    { getState, patchState }: StateContext<StateStorageModel>,
    { url, bucketPath, size }: ActionStorageUrlSet
  ) {
    const images: Record<string, StorageImage> = StateStorage.images(
      getState()
    );
    const image: StorageImage =
      images[bucketPath] == null ? {} : images[bucketPath];

    image[size] = url;
    images[bucketPath] = image;

    patchState({ images });
  }

  @Action(ActionStorageUploadClear)
  uploadClear({ patchState }: StateContext<StateStorageModel>) {
    patchState({ uploadProgress: 0, uploadError: null });
  }

  @Action(ActionStorageUpload)
  upload(
    { dispatch, patchState, getState }: StateContext<StateStorageModel>,
    { dataUri, bucketPath }: ActionStorageUpload
  ) {
    if (dataUri == null) {
      return of(null);
    }

    const ref: AngularFireStorageReference = this.storage.ref(bucketPath);
    const task: AngularFireUploadTask = ref.putString(
      dataUri,
      StorageFormat.DataUrl
    );

    return dispatch(new ActionStorageUploadClear()).pipe(
      switchMap(() => task.percentageChanges()),
      tap((uploadProgress: number) => patchState({ uploadProgress })),
      filter(() => StateStorage.uploadCompleted(getState())),
      switchMap(() => task.snapshotChanges()),
      last(),
      switchMap(() => ref.getDownloadURL()),
      switchMap((url: string) =>
        dispatch([
          new ActionStorageUrlSet(url, bucketPath, ImageSize.Small),
          new ActionStorageUrlSet(url, bucketPath, ImageSize.Medium)
        ])
      ),
      catchError((uploadError: any) => of(patchState({ uploadError })))
    );
  }
}
