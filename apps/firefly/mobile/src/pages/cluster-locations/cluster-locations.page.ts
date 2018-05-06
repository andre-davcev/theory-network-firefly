import {Component, OnInit} from '@angular/core';

import {IonicPage, LoadingController, Loading, ModalController} from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

import { StateCluster } from '../../state/cluster/cluster.state';
import { ComponentMap } from '../../app/components/map/map.component';
import { filter, take } from 'rxjs/operators';
import { StateLocation } from '../../state/location/location.state';
import { PagePublisherClusterLocationsAdd } from '../cluster-locations-add/cluster-locations-add.page';

@IonicPage()
@Component
({
    selector    : 'app-page-cluster-locations',
    templateUrl : 'cluster-locations.page.html'
})

export class PagePublisherClusterLocations implements OnInit
{
    @Select(StateCluster.form)     form$:            Observable<FormGroup>;
    @Select(StateLocation.loading) loadingLocation$: Observable<boolean>;

    private loading: Loading;

    public modal: any;

    constructor(private store: Store, private loadingController: LoadingController, public modalController: ModalController)
    {

    }

    public ngOnInit(): void
    {
        this.modal = this.modalController.create(PagePublisherClusterLocationsAdd);

        this.loadingLocation$.pipe(filter((loading: boolean) => loading), take(1)).

        subscribe(() =>
        {
            this.loading = this.loadingController.create({spinner: 'crescent'});

            this.loading.present();
        });

        this.loadingLocation$.pipe(filter((loading: boolean) => !loading && this.loading != null), take(1)).

        subscribe(() => this.loading.dismiss());
    }

    public addLocations(): void
    {
        this.modal.present();
    }
}
