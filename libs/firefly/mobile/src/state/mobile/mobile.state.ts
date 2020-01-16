
import { Action, StateContext, State, Selector } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import {
    ActionMobileLoadingShow,
    ActionMobileToast,
    ActionMobileLoadingHide,
    ActionMobileMenuOpened,
    ActionMobileMenuClosed,
    ActionMobileNavigateRoot
} from './mobile.actions';
import { StateMobileOptions } from './mobile.state.options';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { LoadingOptions, ToastOptions } from '@ionic/core';
import { Pages } from '@firefly/mobile/enums';
import { NgZone } from '@angular/core';

@State<StateMobileModel>(StateMobileOptions)

export class StateMobile
{
    @Selector() static isLoading(state: StateMobileModel)      : boolean                { return state.loadingElement != null;}
    @Selector() static loadingElement(state: StateMobileModel) : any                    { return state.loadingElement; }
    @Selector() static menuOpen(state: StateMobileModel)       : boolean                { return state.menuOpen; }
    @Selector() static menuClosed(state: StateMobileModel)     : boolean                { return !state.menuOpen; }
    @Selector() static pagesRoot(state: StateMobileModel)      : Record<string, Pages>  { return state.pagesRoot; }
    @Selector() static pageRoot(state: StateMobileModel)       : string                 { return state.pageRoot; }
    @Selector() static pageAlerts(state: StateMobileModel)     : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Alert}`;  }
    @Selector() static pageStream(state: StateMobileModel)     : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Stream}`; }

    constructor
    (
        private loading : LoadingController,
        private toast   : ToastController,
        private nav     : NavController,
        private ngZone  : NgZone
    ) { }

    @Action(ActionMobileLoadingShow)
    loadingShow({ dispatch, patchState }: StateContext<StateMobileModel>)
    {
        const options: LoadingOptions =
        {
            spinner:     'crescent',
            translucent: false,
            cssClass:    'cpt-loading'
        };

        return dispatch(new ActionMobileLoadingHide()).
        pipe
        (
            switchMap(() =>  from(this.loading.create(options))),
            tap((loadingElement: HTMLIonLoadingElement) => patchState({ loadingElement })),
            switchMap((loadingElement: HTMLIonLoadingElement) => from(loadingElement.present()))
        );
    }

    @Action(ActionMobileLoadingHide)
    loadingHide({ getState, patchState }: StateContext<StateMobileModel>)
    {
        const loading: HTMLIonLoadingElement = StateMobile.loadingElement(getState());


        if (loading != null)
        {
            loading.dismiss();
        }

        patchState({ loadingElement: undefined });
    }

    @Action(ActionMobileToast)
    toastShow({ }: StateContext<StateMobileModel>, { payload }: ActionMobileToast)
    {
        const message: string = payload;

        const options: ToastOptions = { duration: 3000 };

        return from(this.toast.create({ ...options, message })).
        pipe
        (
            switchMap((toast: HTMLIonToastElement) => from(toast.present()))
        );
    }

    @Action(ActionMobileMenuOpened)
    menuOpened({ patchState }: StateContext<StateMobileModel>)
    {
        patchState({ menuOpen: true });
    }

    @Action(ActionMobileMenuClosed)
    menuClosed({ patchState }: StateContext<StateMobileModel>)
    {
        patchState({ menuOpen: false });
    }

    @Action(ActionMobileNavigateRoot)
    navigateRoot({ patchState, getState, dispatch }: StateContext<StateMobileModel>, { page, child }: ActionMobileNavigateRoot)
    {
        const pagesRoot : Record<string, Pages> = StateMobile.pagesRoot(getState());

        pagesRoot[page] = child = child == null ? pagesRoot[page] : child;

        const parts: Array<string> = page === child ?
            [ page ] :
            [
                ...page.split('/'),
                ...child.split('/')
            ];
        const pageRoot: string = `/${parts.join('/')}`;

        return from(this.ngZone.run(() => this.nav.navigateRoot(pageRoot))).
        pipe
        (
            tap(() =>
                patchState
                ({
                    pagesRoot,
                    pageRoot
                })
            )
        );
    }
}
