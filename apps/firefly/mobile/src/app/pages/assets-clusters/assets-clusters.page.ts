import { Component, Input } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Select, Store } from '@ngxs/store'
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Cluster, StateUserClusters, ActionClusterSet } from '@firefly/core';

import { Pages } from '../pages.enum';
import { ModalController } from '@ionic/angular';

@Component
({
    selector    : 'app-page-assets-clusters',
    templateUrl : 'assets-clusters.page.html',
    styleUrls   : ['./assets-clusters.page.scss']
})

export class PageAssetsClusters
{
    @Select(StateUserClusters.list) clusters$: Observable<Array<Cluster>>;

    @Input() modal: boolean = false;

    constructor(private store: Store, private modalController: ModalController) { }

    add(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetCluster]));
    }

    ionViewWillEnter()
    {
        this.store.dispatch
        ([
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark})
        ]);
    }

    public cancel(): void
    {
        this.modalController.dismiss();
    }


    public select(cluster: Cluster): void
    {
        this.store.dispatch(new ActionClusterSet(cluster));

        this.modalController.dismiss();
    }
}
