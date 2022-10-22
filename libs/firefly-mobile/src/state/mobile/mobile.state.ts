
import { Action, StateContext, State, Selector } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import {
    ActionMobileToast,
    ActionMobileMenuOpened,
    ActionMobileMenuClosed,
    ActionMobileAuthSelected,
    ActionMobileAuthSelect
} from './mobile.actions';
import { StateMobileOptions } from './mobile.state.options';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ToastOptions } from '@ionic/core';
import { Pages } from '@firefly/mobile/enums';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@State<StateMobileModel>(StateMobileOptions)
@Injectable()
export class StateMobile
{
    @Selector() static menuOpen(state: StateMobileModel)             : boolean                { return state.menuOpen; }
    @Selector() static menuClosed(state: StateMobileModel)           : boolean                { return !state.menuOpen; }
    @Selector() static pageRoot(state: StateMobileModel)             : string                 { return state.pageRoot; }
    @Selector() static pageChild(state: StateMobileModel)            : Record<string, string> { return state.pageChild; }
    @Selector() static pageAlerts(state: StateMobileModel)           : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Notifications}`; }
    @Selector() static pageStream(state: StateMobileModel)           : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Stream}`; }
    @Selector() static pageHome(state: StateMobileModel)             : boolean                { return StateMobile.pageStream(state) || StateMobile.pageAlerts(state); }
    @Selector() static pageCalendar(state: StateMobileModel)         : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Calendar}`; }
    @Selector() static pagePublishInterests(state: StateMobileModel) : boolean                { return StateMobile.pageRoot(state) === `/${Pages.AssetsInterests}`; }
    @Selector() static pagePublishEvents(state: StateMobileModel)    : boolean                { return StateMobile.pageRoot(state) === `/${Pages.AssetsEvents}`; }
    @Selector() static pageUserProfile(state: StateMobileModel)      : boolean                { return StateMobile.pageRoot(state) === `/${Pages.UserProfile}`; }

    constructor
    (
        private toast       : ToastController,
        private actionSheet : ActionSheetController,
        private translate   : TranslateService
    ) { }

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
}
