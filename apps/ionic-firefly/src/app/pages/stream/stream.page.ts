import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SetCluster } from '../../state/cluster/cluster.actions';
import { Subscription } from '../../models/subscription.model';
import { Cluster } from '../../models/cluster.model';
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

        this.store.dispatch(new SetCluster(cluster));
    }

    public ionViewWillEnter(): void
    {
//        this.statusBar.styleLightContent();
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
//        this.statusBar.styleDefault();
    }

    public subscribe(subscription: Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}
