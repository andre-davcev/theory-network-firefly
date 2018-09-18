import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
//import { isCapacitorNative } from '@ionic/core';

import { SplashScreen, StatusBar } from './constants/capacitor.const';
import { switchMap, delay } from 'rxjs/operators';


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
        from(this.platform.ready()).
        pipe
        (
            switchMap(() => from(StatusBar.show())),
            delay(100)
        ).
        subscribe(() => SplashScreen.hide());
    }
}
