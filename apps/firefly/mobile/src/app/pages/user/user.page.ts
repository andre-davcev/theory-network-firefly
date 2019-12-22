import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '@firefly/mobile';

@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.page.html',
    styleUrls   : ['./user.page.scss']
})

export class PageUser
{
    public Pages: any = Pages;
    public segment: string = Pages.UserProfile;

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
