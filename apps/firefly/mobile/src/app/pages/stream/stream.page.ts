import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { ActionSetCluster, StateSubscriptions, Subscription, Cluster } from '@firefly/core';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream
{
    @Select(StateSubscriptions.subscriptions) subscriptions$: Observable<Array<Subscription>>;

    constructor(private store: Store)
    {
        const cluster: Cluster =
        {
            userId      : 'testUser',
            name        : 'My First Cluster',
            description : 'My description'
        };

        this.store.dispatch(new ActionSetCluster(cluster));
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public subscribe(subscription: Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}
