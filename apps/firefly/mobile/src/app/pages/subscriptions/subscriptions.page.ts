import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateMobile } from '@firefly/mobile';
import { MenuController } from '@ionic/angular';
import { ActionUserWatchSubscriptionsStatus } from '@firefly/core';

@Component
({
    selector    : 'app-page-subscriptions',
    templateUrl : 'subscriptions.page.html',
    styleUrls   : ['./subscriptions.page.scss']
})

export class PageSubscriptions
{
    @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

    constructor
    (
        private store : Store,
        private menu  : MenuController
    ) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionUserWatchSubscriptionsStatus());
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
