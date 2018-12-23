import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.page.html',
    styleUrls   : ['./user.page.scss']
})

export class PageUser
{
    public segment: string = 'assets';
    public translations: Array<string> = [];

    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public segmentChanged(event: any): void
    {
        this.segment = event.target.value;
    }
}
