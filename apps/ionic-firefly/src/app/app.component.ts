import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { isCapacitorNative } from '@ionic/core';

import { SplashScreen, StatusBar } from './constants/capacitor.const';


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
        this.platform.ready().then(() =>
        {
            // if (isCapacitorNative(window))
            SplashScreen.hide();
            StatusBar.show();
        });
    }
}
