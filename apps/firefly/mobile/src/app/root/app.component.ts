import { Component } from '@angular/core';
import { Platform, MenuController, ModalController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Actions, ofActionSuccessful, Store, Select } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';

import { PlatformEnum } from '@theory/ionic';

import { Pages, ActionMobileAuthSelected, StateMobile } from '@firefly/mobile';
import { ActionUserLogout, StateUser, IconType, Color, IconSize } from '@firefly/core';
import { Plugins } from '@capacitor/core';
import { ActionMobileMenuOpened, ActionMobileMenuClosed, ActionMobileNavigateRoot } from '@firefly/mobile';
import { PageLogin } from '../pages';

const { SplashScreen } = Plugins;

@Component
({
    selector    : 'app-root',
    templateUrl : 'app.component.html',
    styleUrls   : ['./app.component.scss']
})
export class ComponentApp
{
    @Select(StateUser.found())                userFound$:            Observable<boolean>;
    @Select(StateMobile.pageHome)             pageHome$:             Observable<boolean>;
    @Select(StateMobile.pageCalendar)         pageCalendar$:         Observable<boolean>;
    @Select(StateMobile.pagePublishInterests) pagePublishInterests$: Observable<boolean>;
    @Select(StateMobile.pagePublishEvents)    pagePublishEvents$:    Observable<boolean>;
    @Select(StateMobile.pageUserProfile)      pageUserProfile$:      Observable<boolean>;

    public Pages    : any = Pages;
    public IconType : any = IconType;
    public IconSize : any = IconSize;
    public Color    : any = Color;

    constructor
    (
        private platform: Platform,
        private actions$: Actions,
        private store:    Store,
        private menu:     MenuController,
        private modal:    ModalController
    )
    {
        this.initializeApp();
    }

    private initializeApp(): void
    {
        if (this.platform.is(PlatformEnum.Cordova))
        {
            from(this.platform.ready()).
            pipe(delay(100)).
            subscribe(() => SplashScreen.hide());
        }

        this.actions$.
        pipe(ofActionSuccessful(RouterNavigation)).
        subscribe((data: any) => console.log(data.event.url));

        this.actions$.
        pipe
        (
            ofActionSuccessful(ActionMobileAuthSelected),
            switchMap(({ page }: ActionMobileAuthSelected) =>
                from(this.modal.create
                ({
                    component      : PageLogin,
                    componentProps : { page }
                }))
            ),
            switchMap((modal: HTMLIonModalElement) =>
                modal.present()
            )
        ).
        subscribe();
    }

    public go(page: Pages): void
    {
        this.menu.close();

        this.store.dispatch(new ActionMobileNavigateRoot(page));
    }

    public logout(): void
    {
        this.menu.close();

        this.store.dispatch(new ActionUserLogout()).pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home, Pages.Stream))
            )
        ).subscribe();
    }

    public menuOpened(): void
    {
        this.store.dispatch(new ActionMobileMenuOpened());
    }

    public menuClosed(): void
    {
        this.store.dispatch(new ActionMobileMenuClosed());
    }
}
