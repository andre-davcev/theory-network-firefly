import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { SetCluster } from '../../state/cluster/cluster.actions';
import { Subscription } from '../../models/subscription.model';
import { ServiceTemp } from '../../services/temp.service';
import { Cluster } from '../../models/cluster.model';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream
{
    public subscriptions:Array<Subscription> = [];

    constructor(private store:Store, temp: ServiceTemp)
    {
        const cluster: Cluster =
        {
            userId      : 'testUser',
            name        : 'My First Cluster',
            description : 'My description'
        };

        this.subscriptions = temp.subscriptions;

        this.store.dispatch(new SetCluster(cluster));
    }

    public ionViewWillEnter(): void
    {
//        this.statusBar.styleLightContent();
    }

    public doInfinite(infiniteScroll: any): void
    {
        console.log('Begin async operation');

        setTimeout(() =>
        {
            for (let i = 0; i < 30; i++)
            {
                this.subscriptions.push(this.subscriptions[i]);
            }

            console.log('Async operation has ended');

            infiniteScroll.complete();
        }, 500);
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
