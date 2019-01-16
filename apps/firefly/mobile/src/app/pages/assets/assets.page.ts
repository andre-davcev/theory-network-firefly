import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-assets',
    templateUrl : 'assets.page.html',
    styleUrls   : ['./assets.page.scss']
})

export class PageAssets
{
    public Pages: any = Pages;
    public translations: Array<string> = [];

    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public go(page: Pages): void
    {
        this.store.dispatch(new Navigate([page]));
    }
}

