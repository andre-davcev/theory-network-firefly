import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { RouterNavigation, Navigate } from '@ngxs/router-plugin';

import { SplashScreen } from '@theory/capacitor';
import { PlatformEnum } from '@theory/ionic';

import { Pages } from '@firefly/app/pages';

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
        this.store.dispatch(new Navigate([page]));
    }
}
