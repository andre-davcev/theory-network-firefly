import { Component, Input, OnInit } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Select, Store } from '@ngxs/store'
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Cluster, StateUserClusters, ActionClusterSet, ActionClusterSetId } from '@firefly/core';

import { Pages } from '../pages.enum';
import { ModalController } from '@ionic/angular';
import { StateStorage, StorageImage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { takeUntil } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-assets-clusters',
    templateUrl : 'assets-clusters.page.html',
    styleUrls   : ['./assets-clusters.page.scss']
})

export class PageAssetsClusters extends BaseComponent implements OnInit
{
    @Select(StateUserClusters.data)  list$:  Observable<Array<Cluster>>;
    @Select(StateUserClusters.found) found$: Observable<boolean>;
    @Select(StateStorage.images)     images$: Observable<Record<string, StorageImage>>;

    @Input() modal: boolean = false;

    public images: Record<string, StorageImage> = {};

    constructor
    (
        private store:           Store,
        private modalController: ModalController
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
        )
    }

    public ionViewWillEnter()
    {
        this.store.dispatch
        ([
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark})
        ]);
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
        this.store.dispatch(new ActionClusterSetId(cluster.id));

        this.modalController.dismiss();
    }
}
