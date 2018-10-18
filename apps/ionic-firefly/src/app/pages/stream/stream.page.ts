import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';
import { Subscription, Cluster } from '@firefly/core';

import { ActionSetCluster } from '../../state/cluster/cluster.actions';
import { StateSubscriptions } from '../../state/subscriptions/subscriptions.state';

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
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public subscribe(subscription: Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}
