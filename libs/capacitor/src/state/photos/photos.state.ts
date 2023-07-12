import { Injectable } from '@angular/core';
import { MediaAlbum, MediaAsset } from '@capacitor-community/media';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ActionPhotosGet, ActionPhotosGetAlbums } from './photos.actions';
import { StatePhotosModel } from './photos.state.model';
import { StatePhotosOptions } from './photos.state.options';

@State<StatePhotosModel>(StatePhotosOptions)
@Injectable()
export class StatePhotos {
  @Selector() static photos(state: StatePhotosModel): Array<MediaAsset> {
    return state.photos == null ? [] : state.photos.medias;
  }

  @Selector() static albums(state: StatePhotosModel): Array<MediaAlbum> {
    return state.albums == null ? [] : state.albums.albums;
  }

  @Action(ActionPhotosGet)
  getLibrary(
    { patchState }: StateContext<StatePhotosModel>,
    { payload }: ActionPhotosGet
  ) {
    /*
        return from(Photos.getPhotos(payload)).pipe
        (
            tap((photos: PhotosResult) => patchState({ photos })),
            catchError(() => of(patchState({ photos: StatePhotosOptions.defaults.photos })))
        );
        */
  }

  @Action(ActionPhotosGetAlbums)
  getAlbums({ patchState }: StateContext<StatePhotosModel>) {
    /*
        return from(Photos.getAlbums(payload)).pipe
        (
            tap((albums: PhotosAlbumsResult) => patchState({ albums })),
            catchError(() => of(patchState({ albums: StatePhotosOptions.defaults.albums })))
        );
        */
  }
}
