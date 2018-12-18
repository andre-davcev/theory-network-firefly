import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert
{
    constructor(private store: Store) { }

    ionViewWillEnter()
    {
//        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }
}
