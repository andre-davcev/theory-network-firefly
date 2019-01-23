import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Select, Store } from '@ngxs/store'
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Cluster, StateCluster, ActionGetClusters } from '@firefly/core';

import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-assets-clusters',
    templateUrl : 'assets-clusters.page.html',
    styleUrls   : ['./assets-clusters.page.scss']
})

export class PageAssetsClusters
{
    @Select(StateCluster.clusters) clusters$: Observable<Array<Cluster>>;

    constructor(private store: Store) { }

    add(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetCluster]));
    }

    ionViewWillEnter()
    {
        this.store.dispatch
        ([
            new ActionGetClusters(),
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark})
        ]);
    }
}
