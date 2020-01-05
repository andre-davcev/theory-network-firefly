import { Component, OnInit } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateMobile } from '@firefly/mobile';
import { MenuController } from '@ionic/angular';
import { StateUserSubscriptions, ActionUserSubscriptionToggle, ActionUserSubscriptionsReset, ActionUserWatchSubscriptionsStatus } from '@firefly/core';
import { Subscription } from '@firefly/cloud';
import { BaseComponent } from '@theory/core';
import { StateStorage, StorageImage } from '@theory/firebase';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-subscriptions',
    templateUrl : 'subscriptions.page.html',
    styleUrls   : ['./subscriptions.page.scss']
})

export class PageSubscriptions extends BaseComponent implements OnInit
{
    @Select(StateUserSubscriptions.data()) subscriptions$: Observable<Array<Subscription>>;
    @Select(StateStorage.images)           images$:   Observable<Record<string, StorageImage>>;
    @Select(StateMobile.menuOpen)          menuOpen$: Observable<boolean>;

    public images: Record<string, StorageImage> = {};

    constructor
    (
        private store : Store,
        private menu  : MenuController
    )
    {
      super();
    }

     public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }

    public toggle(event, subscription: Subscription)
    {
      this.store.dispatch(new ActionUserSubscriptionToggle(subscription.id)).pipe(
        switchMap(() =>
          this.store.dispatch(new ActionUserSubscriptionsReset())
        ),
        switchMap(()=>
          this.store.dispatch(new ActionUserWatchSubscriptionsStatus())
        )
      ).subscribe();
    }
}
