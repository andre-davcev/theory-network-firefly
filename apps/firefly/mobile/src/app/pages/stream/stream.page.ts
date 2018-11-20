import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

import { StatusBar } from '@theory/capacitor';
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

    constructor(private store: Store, private modalController: ModalController)
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
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public dismiss(): void
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
        this.modalController.dismiss();
    }

    public subscribe(subscription: Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}
