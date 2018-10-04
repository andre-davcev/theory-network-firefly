import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

import { SplashScreen, StatusBar } from './constants/capacitor.const';
import { PlatformEnum } from './enums/platform.enum';

@Component
({
    selector    : 'app-root',
    templateUrl : 'app.component.html'
})
export class ComponentApp
{
    constructor(private platform: Platform)
    {
        this.initializeApp();
    }

    private initializeApp(): void
    {
        if (this.platform.is(PlatformEnum.Cordova))
        {
            from(this.platform.ready()).
            pipe
            (
                switchMap(() => from(StatusBar.show())),
                delay(100)
            ).
            subscribe(() => SplashScreen.hide());
        }
    }
}
