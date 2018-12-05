import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Store } from '@ngxs/store';

@Component
({
    selector    : 'app-page-subscriptions',
    templateUrl : 'subscriptions.page.html',
    styleUrls   : ['./subscriptions.page.scss']
})

export class PageSubscriptions
{
    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }
}
