import { Component } from '@angular/core';
//import { isCapacitorNative } from '@ionic/core';
import { Platform } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';

import { AppInitialize } from './state/app/app.actions';
import { StatusBar } from './constants/capacitor.const';

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
//            if (isCapacitorNative(window))
//            {
                StatusBar.setStyle({style: StatusBarStyle.Dark});
//            }

            this.store.dispatch(new AppInitialize());
        });
    }
}
