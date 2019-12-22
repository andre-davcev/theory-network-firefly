import { Component, Input, OnInit } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Select, Store } from '@ngxs/store'
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateUserClusters, ActionClusterSetId, ActionEventClusterAdd } from '@firefly/core';
import { Cluster } from '@firefly/cloud';

import { Pages } from '@firefly/mobile';
import { ModalController, MenuController } from '@ionic/angular';
import { StateStorage, StorageImage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { takeUntil } from 'rxjs/operators';
import { StateMobile } from '@firefly/mobile';

@Component
({
    selector    : 'app-page-assets-clusters',
    templateUrl : 'assets-clusters.page.html',
    styleUrls   : ['./assets-clusters.page.scss']
})

export class PageAssetsClusters extends BaseComponent implements OnInit
{
    @Select(StateUserClusters.data())  list$:     Observable<Array<Cluster>>;
    @Select(StateUserClusters.found()) found$:    Observable<boolean>;
    @Select(StateStorage.images)       images$:   Observable<Record<string, StorageImage>>;
    @Select(StateMobile.menuOpen)      menuOpen$: Observable<boolean>

    @Input() modal: boolean = false;

    public images: Record<string, StorageImage> = {};

    constructor
    (
        private store           : Store,
        private modalController : ModalController,
        private menu            : MenuController
    )
    {
        super();
    }

    public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    public ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public add(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetCluster]));
    }

    public cancel(): void
    {
        this.modalController.dismiss();
    }

    public select(cluster: Cluster): void
    {
        /*this.store.dispatch(new ActionClusterSetId(cluster.id)).pipe(
          switchMap(() => this.store.dispatch(new Navigate([Pages.AssetCluster], {queryParams: {id: cluster.id}}, {state: {isClusterDetail:true}})))
        );*/

        if(this.modal)
        {
            this.store.dispatch
            ([
                new ActionClusterSetId(cluster.id),
                new ActionEventClusterAdd(cluster)
            ]);

            this.modalController.dismiss();
        }
        else
          this.store.dispatch(new Navigate([Pages.AssetCluster], {id: cluster.id}, {state: {isClusterDetail:true}}));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
