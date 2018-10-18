import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { filter, take, switchMap } from 'rxjs/operators';
import { Select } from '@ngxs/store';

import { StateCluster, StateLocation } from '@firefly/core';

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

    constructor(private loadingController: LoadingController) { }

    public ngOnInit(): void
    {
        this.loadingLocation$.

        pipe
        (
            filter((loading: boolean) => loading),
            take(1),
            switchMap(() => from(this.loadingController.create({spinner: 'crescent'})))
        ).

        subscribe((loading: HTMLIonLoadingElement) => {
          this.loading = loading;

          loading.present();
        });

        this.loadingLocation$.
        pipe
        (
            filter((loading: boolean) => !loading && this.loading != null),
            take(1)
        ).

        subscribe(() => this.loading.dismiss());
    }
}
