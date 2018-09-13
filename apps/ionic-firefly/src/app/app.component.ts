import { Component } from '@angular/core';
//import { isCapacitorNative } from '@ionic/core';
import { Platform } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';

import { AppInitialize } from './state/app/app.actions';
import { StatusBar, SplashScreen } from './constants/capacitor.const';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { tap } from 'rxjs/operators';


@Component
({
    selector    : 'app-root',
    templateUrl : 'app.component.html'
})
export class ComponentApp
{
    constructor(private platform: Platform, private store: Store)
    {
        this.initializeApp();
    }

    private initializeApp(): void
    {
        this.platform.ready().then(() =>
        {
            // if (isCapacitorNative(window))
            this.store.dispatch(new AppInitialize());

//            fromPromise(StatusBar.show()).pipe(tap(() => StatusBar.setStyle({style: StatusBarStyle.Dark})));
            SplashScreen.hide();
        });
    }
}
