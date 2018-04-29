import {Component, AfterViewInit} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { StateCluster, SetClusterId } from '../../ngxs/cluster/cluster.state';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

@IonicPage()
@Component
({
    selector    : 'app-page-cluster',
    templateUrl : 'cluster.page.html'
})

export class PagePublisherCluster
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

    segment:string = 'clusters';

    constructor(private store: Store, private nav: NavController)
    {
        this.store.dispatch(new SetClusterId('new'));
    }

    public navigateCategories(): void
    {
        this.nav.push('PagePublisherClusterCategories');
    }

    public navigateLocations(): void
    {
        this.nav.push('PagePublisherClusterLocations');
    }
}
