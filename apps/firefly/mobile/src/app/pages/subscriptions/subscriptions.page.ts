import { Component, OnInit } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { StateMobile, Pages, ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { MenuController } from '@ionic/angular';
import { StateUserSubscriptions, ActionUserSubscriptionToggle, ActionUserSubscriptionsReset, ActionUserWatchSubscriptionsStatus, ActionClusterSetId, StateUserClusters, ActionUserClustersGetData } from '@firefly/core';
import { Subscription } from '@firefly/cloud';
import { BaseComponent } from '@theory/core';
import { StateStorage, StorageImage } from '@theory/firebase';
import { takeUntil, switchMap, take } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

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
    @Select(StateUserClusters.initialized()) clustersInitialized$: Observable<boolean>;

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
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }

    public toggle(event, subscription: Subscription)
    {
      this.store.dispatch(new ActionUserSubscriptionToggle(subscription.id));
    }

    public select(subscription: Subscription): void
    {
      this.clustersInitialized$.
        pipe
        (
            take(1),
            switchMap((initialized: boolean) =>
                initialized ?
                    of(null) :
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => this.store.dispatch(new ActionUserClustersGetData())),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
                    )
            ),
            switchMap(() =>
            this.store.dispatch(new Navigate([Pages.AssetCluster], {id: subscription.id}, {state: {isClusterDetail:true}}))
            )
        ).subscribe();
    }
}
