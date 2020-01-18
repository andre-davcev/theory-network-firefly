import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages, StateMobile } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';

@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.page.html',
    styleUrls   : ['./publisher.page.scss']
})

export class PagePublisher
{
    @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

    public Pages : any = Pages;

    constructor
    (
        private menu  : MenuController,
        private store : Store
    )
    { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public navigate(page: Pages): void
    {
        this.store.dispatch(new Navigate([ page ]));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
