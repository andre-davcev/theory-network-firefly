
import { Action, StateContext, State, Selector, Store } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import {
    ActionMobileLoadingShow,
    ActionMobileToast,
    ActionMobileLoadingHide,
    ActionMobileMenuOpened,
    ActionMobileMenuClosed,
    ActionMobileNavigateRoot,
    ActionMobileAuthSelected,
    ActionMobileSlideAlertIndex,
    ActionMobileSlideAlertRestore,
    ActionMobileAuthSelect
} from './mobile.actions';
import { StateMobileOptions } from './mobile.state.options';
import { LoadingController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { LoadingOptions, ToastOptions } from '@ionic/core';
import { Pages } from '@firefly/mobile/enums';
import { NgZone, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StateUserAlerts, ActionAlertSetId, ActionUserAlertsAdd, ActionUserAlertsMarkRead } from '@firefly/core';
import { Alert } from '@firefly/cloud';

@State<StateMobileModel>(StateMobileOptions)
@Injectable()
export class StateMobile
{
    @Selector() static isLoading(state: StateMobileModel)            : boolean                { return state.loadingElement != null;}
    @Selector() static loadingElement(state: StateMobileModel)       : any                    { return state.loadingElement; }
    @Selector() static menuOpen(state: StateMobileModel)             : boolean                { return state.menuOpen; }
    @Selector() static menuClosed(state: StateMobileModel)           : boolean                { return !state.menuOpen; }
    @Selector() static pageRoot(state: StateMobileModel)             : string                 { return state.pageRoot; }
    @Selector() static pageChild(state: StateMobileModel)            : Record<string, string> { return state.pageChild; }
    @Selector() static pageAlerts(state: StateMobileModel)           : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Alert}`; }
    @Selector() static pageStream(state: StateMobileModel)           : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Stream}`; }
    @Selector() static pageHome(state: StateMobileModel)             : boolean                { return StateMobile.pageStream(state) || StateMobile.pageAlerts(state); }
    @Selector() static pageSubscriptions(state: StateMobileModel)    : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Subscriptions}`; }
    @Selector() static pagePublishInterests(state: StateMobileModel) : boolean                { return StateMobile.pageRoot(state) === `/${Pages.AssetsInterests}`; }
    @Selector() static pagePublishEvents(state: StateMobileModel)    : boolean                { return StateMobile.pageRoot(state) === `/${Pages.AssetsEvents}`; }
    @Selector() static pageUserProfile(state: StateMobileModel)      : boolean                { return StateMobile.pageRoot(state) === `/${Pages.UserProfile}`; }
    @Selector() static pageUserSettings(state: StateMobileModel)     : boolean                { return StateMobile.pageRoot(state) === `/${Pages.UserSettings}`; }
    @Selector() static indexAlerts(state: StateMobileModel)          : number                 { return state.indexAlerts; }

    constructor
    (
        private loading     : LoadingController,
        private toast       : ToastController,
        private nav         : NavController,
        private actionSheet : ActionSheetController,
        private translate   : TranslateService,
        private ngZone      : NgZone,
        private store       : Store
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
    navigateRoot({ patchState, getState }: StateContext<StateMobileModel>, { page, child }: ActionMobileNavigateRoot)
    {
        const pageChild: Record<string, string> = StateMobile.pageChild(getState());
        const parts: Array<string> = [ ...page.split('/') ];

        child = child == null ? pageChild[page] : child;

        if (child != null)
        {
            parts.push(...child.split('/'));

            pageChild[page] = child;
        }

        const pageRoot: string = `/${parts.join('/')}`;

        return from(this.ngZone.run(() => this.nav.navigateRoot(pageRoot))).
        pipe
        (
            tap(() =>
                patchState({ pageRoot, pageChild })
            )
        );
    }

    @Action(ActionMobileAuthSelect)
    authSelect({ dispatch }: StateContext<StateMobileModel>)
    {
        return this.translate.
        get
        ([
            'general.authenticate',
            'general.login',
            'general.signup',
            'general.resetPassword'
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                from(this.actionSheet.create
                  ({
                      header: translations['general.authenticate'],

                      buttons:
                      [
                          {
                              text : translations['general.login'],
                              handler : () => { dispatch(new ActionMobileAuthSelected(Pages.Login)); }
                          },
                          {
                              text    : translations['general.signup'],
                              handler : () => { dispatch(new ActionMobileAuthSelected(Pages.SignUp)); }
                          },
                          {
                              text    : translations['general.resetPassword'],
                              handler : () => { dispatch(new ActionMobileAuthSelected(Pages.ResetPassword)); }
                          }
                      ]
                  }))
            ),
            switchMap((actionSheet: HTMLIonActionSheetElement) =>
                actionSheet.present()
            )
        );
    }

    @Action(ActionMobileAuthSelected)
    authSelected(context: StateContext<StateMobileModel>, { page }: ActionMobileAuthSelected)
    {

    }

    @Action(ActionMobileSlideAlertRestore)
    slideAlertRestore({ dispatch }: StateContext<StateMobileModel>, { slides }: ActionMobileSlideAlertRestore)
    {
        return slides == null ?
            of(null) :
            this.store.selectOnce(StateMobile.indexAlerts).
            pipe
            (
                switchMap((index: number) =>
                    from(slides.slideTo(index, 0)).
                    pipe
                    (
                        switchMap(() =>
                            dispatch(new ActionMobileSlideAlertIndex(index))
                        )
                    )
                )
            );
    }

    @Action(ActionMobileSlideAlertIndex)
    slideAlertIndex({ patchState, dispatch }: StateContext<StateMobileModel>, { index }: ActionMobileSlideAlertIndex)
    {
        patchState({ indexAlerts: index });

        return this.store.selectOnce(StateUserAlerts.unreadList).
        pipe
        (
            map((unread: Array<Alert>) =>
                unread[index]
            ),
            filter((alert: Alert) =>
                alert != null
            ),
            switchMap((alert: Alert) =>
                dispatch(new ActionUserAlertsMarkRead(alert.id))
            )
        );
    }
}
