import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';

import { SplashScreen } from '@theory/capacitor';
import { PlatformEnum } from '@theory/ionic';

@Component
({
    selector    : 'app-root',
    templateUrl : 'app.component.html'
})
export class ComponentApp
{
    constructor(private platform: Platform, private actions$: Actions)
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
}
