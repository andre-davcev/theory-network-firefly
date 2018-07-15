import {Component} from '@angular/core';

import {IonicPage, ViewController} from 'ionic-angular';

import {Page} from '../page';

import {Store} from '@ngxs/store';
import { Cluster } from '../../models/cluster';
import { SetCluster } from '../../state/cluster/cluster.actions';
import { StatusBar } from '@ionic-native/status-bar';
import { Subscription } from '../../models/subscription';
import { Temp } from '../../services/temp';

@IonicPage()
@Component
({
    selector    : 'app-page-find',
    templateUrl : 'find.html'
})

export class PageFind
{
    public subscriptions:Array<Subscription> = [];

    constructor(private store:Store, private statusBar: StatusBar, private viewController: ViewController, temp: Temp)
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
        this.statusBar.styleLightContent();
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
        this.viewController.dismiss();
        this.statusBar.styleDefault();
    }

    public subscribe(subscription: Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}
