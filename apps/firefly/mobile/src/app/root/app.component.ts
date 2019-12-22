import { Component } from '@angular/core';
import { Platform, MenuController, NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { RouterNavigation, Navigate } from '@ngxs/router-plugin';

import { PlatformEnum } from '@theory/ionic';

import { Pages } from '@firefly/mobile';
import { ActionUserLogout } from '@firefly/core';
import { Plugins } from '@capacitor/core';
import { ActionMobileMenuOpened, ActionMobileMenuClosed, ActionMobileNavigateRoot } from '@firefly/mobile';

const { SplashScreen } = Plugins;

@Component
({
    selector    : 'app-root',
    templateUrl : 'app.component.html',
    styleUrls   : ['./app.component.scss']
})
export class ComponentApp
{
    public Pages: any = Pages;

    constructor
    (
        private platform: Platform,
        private actions$: Actions,
        private store:    Store,
        private menu:     MenuController
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

        this.actions$.pipe(ofActionSuccessful(RouterNavigation)).
        subscribe((data: any) => console.log(data.event.url));
    }

    public go(page: Pages): void
    {
        this.menu.close();
        this.menuClosed();

        this.store.dispatch(new ActionMobileNavigateRoot(page));
    }

    public logout(): void
    {
        this.menu.close();
        this.menuClosed();
        this.store.dispatch(new ActionUserLogout());
        this.store.dispatch(new Navigate([Pages.Login]));
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
