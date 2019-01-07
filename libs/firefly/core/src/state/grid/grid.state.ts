import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { PhotoAsset } from '@capacitor/core';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { StateGridModel } from './grid.state.model';
import { StateGridOptions } from './grid.state.options';
import { StatePhotos, ActionPhotosGet } from '@theory/capacitor';

import { CoreEnum } from '@theory/core';
import { ActionGridIconLibraryWatch, ActionGridImageLibraryWatch, ActionGridIconPageSizeSet, ActionGridImagePageSizeSet, ActionGridIconLibraryPage, ActionGridImageLibraryPage } from './grid.actions';

@State<StateGridModel>(StateGridOptions)

export class StateGrid
{
    @Select(StatePhotos.photos) photos$: Observable<Array<PhotoAsset>>;

    private urls: Array<string> =
    [
        'assets/images/temp-icon-1.png',
        'assets/images/temp-icon-2.png',
        'assets/images/temp-icon-3.png',
        'assets/images/temp-icon-4.png',
        'assets/images/temp-icon-5.png',
        'assets/images/temp-icon-6.png',
        'assets/images/temp-icon-7.png'
    ];

    @Selector() static iconLibrary(state: StateGridModel):  Array<string> { return state.iconLibraryLazy; }
    @Selector() static imageLibrary(state: StateGridModel): Array<string> { return state.iconLibraryLazy; }

    private static iconPageSize(state: StateGridModel):    number        { return state.iconPageSize; }
    private static iconLibraryAll(state: StateGridModel):  Array<string> { return state.iconLibrary; }
    private static iconLibraryPage(state: StateGridModel): number        { return state.iconLibraryPage; }

    private static imagePageSize(state: StateGridModel):    number        { return state.imagePageSize; }
    private static imageLibraryAll(state: StateGridModel):  Array<string> { return state.imageLibrary; }
    private static imageLibraryPage(state: StateGridModel): number        { return state.imageLibraryPage; }

    constructor() { }

    @Action(ActionGridIconPageSizeSet)
    iconPageSizeSet({ patchState }: StateContext<StateGridModel>, { payload }: ActionGridIconPageSizeSet)
    {
        patchState
        ({
            iconPageSize:    payload,
            iconLibrary:     StateGridOptions.defaults.iconLibrary,
            iconLibraryLazy: StateGridOptions.defaults.iconLibraryLazy,
            iconLibraryPage: StateGridOptions.defaults.iconLibraryPage
        });
    }

    @Action(ActionGridIconLibraryWatch, { cancelUncompleted: true })
    iconLibraryWatch({ patchState, dispatch }: StateContext<StateGridModel>)
    {
        return dispatch(new ActionPhotosGet()).pipe
        (
            switchMap(() => this.photos$),
            map((photos: Array<PhotoAsset>) => photos.map((photo: PhotoAsset) => `${CoreEnum.DataUri}${photo.data}`)),
            tap((library: Array<string>) => patchState
            ({
                iconLibrary:     library,
                iconLibraryLazy: StateGridOptions.defaults.iconLibraryLazy,
                iconLibraryPage: StateGridOptions.defaults.iconLibraryPage
            })),
            tap(() => dispatch(new ActionGridIconLibraryPage()))
        );
    };

    @Action(ActionGridIconLibraryPage)
    iconLibraryPage({ patchState, getState }: StateContext<StateGridModel>)
    {
        const state: StateGridModel    = getState();
        const pageNumber: number       = StateGrid.iconLibraryPage(state);
        const pageSize: number         = StateGrid.iconPageSize(state);
        const icons: Array<string>     = StateGrid.iconLibraryAll(state);
        const iconsLazy: Array<string> = StateGrid.iconLibrary(state);
        const iconsLength: number      = icons.length;
        const iconsLazyLength: number  = iconsLazy.length;
        const difference: number       = iconsLength - iconsLazyLength;

        if (iconsLength > iconsLazyLength)
        {
            const iconCount: number = difference > pageSize ? pageSize : difference;
            const start: number     = pageNumber * pageSize;
            const end: number       = start + iconCount - 1;

            patchState
            ({
                iconLibraryPage: pageNumber + 1,
                iconLibraryLazy :
                [
                    ...iconsLazy,
                    ...icons.slice(start, end)
                ]
            });
        }
    }

    @Action(ActionGridImagePageSizeSet)
    imagePageSizeSet({ patchState }: StateContext<StateGridModel>, { payload }: ActionGridImagePageSizeSet)
    {
        patchState
        ({
            imagePageSize:    payload,
            imageLibrary:     StateGridOptions.defaults.imageLibrary,
            imageLibraryLazy: StateGridOptions.defaults.imageLibraryLazy,
            imageLibraryPage: StateGridOptions.defaults.imageLibraryPage
        });
    }

    @Action(ActionGridImageLibraryWatch, { cancelUncompleted: true })
    imageLibraryWatch({ patchState, dispatch }: StateContext<StateGridModel>)
    {
        return dispatch(new ActionPhotosGet()).pipe
        (
            switchMap(() => this.photos$),
            map((photos: Array<PhotoAsset>) => photos.map((photo: PhotoAsset) => `${CoreEnum.DataUri}${photo.data}`)),
            tap((library: Array<string>) => patchState
            ({
                imageLibrary:     library,
                imageLibraryLazy: StateGridOptions.defaults.imageLibraryLazy,
                imageLibraryPage: StateGridOptions.defaults.imageLibraryPage
            })),
            tap(() => dispatch(new ActionGridImageLibraryPage()))
        );
    };

    @Action(ActionGridImageLibraryPage)
    imageLibraryPage({ patchState, getState }: StateContext<StateGridModel>)
    {
        const state: StateGridModel     = getState();
        const pageNumber: number        = StateGrid.imageLibraryPage(state);
        const pageSize: number          = StateGrid.imagePageSize(state);
        const images: Array<string>     = StateGrid.imageLibraryAll(state);
        const imagesLazy: Array<string> = StateGrid.imageLibrary(state);
        const imagesLength: number      = images.length;
        const imagesLazyLength: number  = imagesLazy.length;
        const difference: number        = imagesLength - imagesLazyLength;

        if (imagesLength > imagesLazyLength)
        {
            const imageCount: number = difference > pageSize ? pageSize : difference;
            const start: number      = pageNumber * pageSize;
            const end: number        = start + imageCount - 1;

            patchState
            ({
                iconLibraryPage: pageNumber + 1,
                iconLibraryLazy :
                [
                    ...imagesLazy,
                    ...images.slice(start, end)
                ]
            });
        }
    }
}
