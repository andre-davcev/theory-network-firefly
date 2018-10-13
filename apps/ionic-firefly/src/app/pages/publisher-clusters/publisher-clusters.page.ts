import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

import { Subscription } from '../../models/subscription.model';
import { StateSubscriptions } from '../../state/subscriptions/subscriptions.state';
import { Cluster } from '../../models/cluster.model';

@Component
({
    selector    : 'app-page-publisher-clusters',
    templateUrl : 'publisher-clusters.page.html',
    styleUrls   : ['./publisher-clusters.page.scss']
})

export class PagePublisherClusters
{
    @Select(StateSubscriptions.subscriptions) subscriptions$: Observable<Array<Subscription>>;

    constructor() { }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    public clicked(cluster: Cluster)
    {
        console.log(cluster);
    }

    public deleted(cluster: Cluster)
    {
        console.log(cluster);
    }
}
