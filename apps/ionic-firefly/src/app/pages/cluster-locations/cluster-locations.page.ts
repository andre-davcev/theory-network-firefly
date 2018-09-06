import {Component, OnInit} from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

import { StateCluster } from '../../state/cluster/cluster.state';
import { filter, take, switchMap } from 'rxjs/operators';
import { StateLocation } from '../../state/location/location.state';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component
({
    selector    : 'app-page-cluster-locations',
    templateUrl : 'cluster-locations.page.html',
    styleUrls   : ['./cluster-locations.page.scss']
})

export class PagePublisherClusterLocations implements OnInit
{
    @Select(StateCluster.form)     form$:            Observable<FormGroup>;
    @Select(StateLocation.loading) loadingLocation$: Observable<boolean>;

    private loading: HTMLIonLoadingElement;

    constructor(private store: Store, private loadingController: LoadingController, public modalController: ModalController) { }

    public ngOnInit(): void
    {
        this.loadingLocation$.

        pipe
        (
            filter((loading: boolean) => loading),
            take(1),
            switchMap(() => fromPromise(this.loadingController.create({spinner: 'crescent'})))
        ).

        subscribe((loading: HTMLIonLoadingElement) => loading.present());

        this.loadingLocation$.
        pipe
        (
            filter((loading: boolean) => !loading && this.loading != null),
            take(1)
        ).

        subscribe(() => this.loading.dismiss());
    }
}
