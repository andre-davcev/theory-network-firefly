import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Store } from '@ngxs/store';

@Component
({
    selector    : 'app-page-search',
    templateUrl : 'search.page.html',
    styleUrls   : ['./search.page.scss']
})

export class PageSearch
{
    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }
}
