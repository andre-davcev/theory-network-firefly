import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PhotosResult, PhotosAlbumsResult, PhotoAsset, PhotosAlbum } from '@capacitor/core';
import { from, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { StatePhotosModel } from './photos.state.model';
import { StatePhotosOptions } from './photos.state.options';
import { ActionPhotosGet, ActionPhotosGetAlbums } from './photos.actions';
import { Photos } from '@theory/capacitor/constants';

@State<StatePhotosModel>(StatePhotosOptions)
export class StatePhotos
{
    @Selector() static photos(state: StatePhotosModel): Array<PhotoAsset>
    {
        return state.photos == null ? [] : state.photos.photos;
    }

    @Selector() static albums(state: StatePhotosModel): Array<PhotosAlbum>
    {
        return state.albums == null ? [] : state.albums.albums;
    }

    constructor() { }

    @Action(ActionPhotosGet)
    getLibrary({ patchState }: StateContext<StatePhotosModel>, { payload }: ActionPhotosGet)
    {
        return from(Photos.getPhotos(payload)).pipe
        (
            tap((photos: PhotosResult) => patchState({ photos })),
            catchError(() => of(patchState({ photos: StatePhotosOptions.defaults.photos })))
        );
    }

    @Action(ActionPhotosGetAlbums)
    getAlbums({ patchState }: StateContext<StatePhotosModel>, { payload }: ActionPhotosGetAlbums)
    {
        return from(Photos.getAlbums(payload)).pipe
        (
            tap((albums: PhotosAlbumsResult) => patchState({ albums })),
            catchError(() => of(patchState({ albums: StatePhotosOptions.defaults.albums })))
        );
    }
}
