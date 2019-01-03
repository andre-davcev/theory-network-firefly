import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LibraryItem, AlbumItem, PhotoLibrary, RequestAuthorizationOptions } from '@ionic-native/photo-library';
import { from, of, Observable } from 'rxjs';
import { tap, catchError, filter, switchMap } from 'rxjs/operators';

import { StatePhotosModel } from './photos.state.model';
import { StatePhotosOptions } from './photos.state.options';
import { ActionPhotosRequestAuthorization, ActionPhotosGetLibrary, ActionPhotosGetAlbums, ActionPhotosSetAuthorizationOptions } from './photos.actions';

@State<StatePhotosModel>(StatePhotosOptions)
export class StatePhotos
{
    @Selector() static authorizationOptions(state: StatePhotosModel): RequestAuthorizationOptions { return state.authorizationOptions; }
    @Selector() static authorized(state: StatePhotosModel): boolean { return state.authorized; }
    @Selector() static library(state: StatePhotosModel): Array<LibraryItem> { return state.library; }
    @Selector() static albums(state: StatePhotosModel): Array<AlbumItem> { return state.albums; }

    @Selector() static libraryThumbnailUrls(state: StatePhotosModel): Array<string>
    {
        return state.library.map((photo: LibraryItem) => photo.thumbnailURL);
    }

    constructor(private photoLibrary: PhotoLibrary) { }

    @Action(ActionPhotosSetAuthorizationOptions)
    setAuthorizationOptions({ patchState }: StateContext<StatePhotosModel>, { payload }: ActionPhotosSetAuthorizationOptions)
    {
        patchState({ authorizationOptions: payload });
    }

    @Action(ActionPhotosRequestAuthorization)
    requestAuthorization({ patchState, getState }: StateContext<StatePhotosModel>)
    {
        return from(this.photoLibrary.requestAuthorization(getState().authorizationOptions)).pipe
        (
            tap(() => patchState({authorized: true})),
            catchError(() => of(patchState({authorized: false})))
        );
    }

    @Action(ActionPhotosGetLibrary)
    getLibrary({ patchState, getState, dispatch }: StateContext<StatePhotosModel>, { payload }: ActionPhotosGetLibrary)
    {
        const state: StatePhotosModel = getState();

        if (!state.watchingLibrary)
        {
            const authorization$: Observable<void> = state.authorized ? of() : dispatch(new ActionPhotosRequestAuthorization());

            return authorization$.pipe
            (
                filter(() => getState().authorized),
                switchMap(() => from(this.photoLibrary.getLibrary(payload))),
                tap((library: Array<LibraryItem>) => patchState({ library, watchingLibrary: true })),
                catchError(() => of(patchState({ library: StatePhotosOptions.defaults.library, watchingLibrary: false })))
            );
        }
    }

    @Action(ActionPhotosGetAlbums)
    getAlbums({ patchState, getState, dispatch }: StateContext<StatePhotosModel>)
    {
        const state: StatePhotosModel = getState();

        if (!state.watchingAlbums)
        {
            const authorization$: Observable<void> = state.authorized ? of() : dispatch(new ActionPhotosRequestAuthorization());

            return authorization$.pipe
            (
                filter(() => getState().authorized),
                switchMap(() => from(this.photoLibrary.getAlbums())),
                tap((albums: Array<AlbumItem>) => patchState({ albums, watchingAlbums: true })),
                catchError(() => of(patchState({ albums: StatePhotosOptions.defaults.albums, watchingAlbums: false })))
            );
        }
    }
}
