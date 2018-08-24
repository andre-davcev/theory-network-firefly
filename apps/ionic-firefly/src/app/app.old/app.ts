import {Component, ViewChild} from '@angular/core';

import {Nav, Platform} from 'ionic-angular';
import { Store } from '@ngxs/store';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppInitialize } from '../state/app/app.actions';

export interface PageInterface
{
    title         : string;
    name          : string;
    component     : any;
    icon          : string;
    index?        : number;
    tabName?      : string;
    tabComponent? : any;
}

@Component
({
    templateUrl: 'app.html'
})

export class ComponentApp
{
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav)
    public nav: Nav;

    rootPage:string;

    constructor(private platform  : Platform, private store : Store, private splashScreen : SplashScreen)
    {
        this.initialize();
    }

    private initialize(): void
    {
        this.rootPage = 'PageLogin';

        this.platform.ready().then(() =>
        {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.splashScreen.hide();

            this.store.dispatch(new AppInitialize());
        });
    }
}
