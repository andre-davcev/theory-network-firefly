import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Subscription, Cluster } from '@firefly/core';

@Component
({
    selector    : 'app-page-publisher-clusters',
    templateUrl : 'publisher-clusters.page.html',
    styleUrls   : ['./publisher-clusters.page.scss']
})

export class PagePublisherClusters
{
    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
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
