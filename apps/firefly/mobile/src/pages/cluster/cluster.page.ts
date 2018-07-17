import {Component, AfterViewInit} from '@angular/core';

import {IonicPage, NavController, ViewController} from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { StateCluster } from '../../state/cluster/cluster.state';
import { SetClusterId } from '../../state/cluster/cluster.actions';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';
import { StatusBar } from '@ionic-native/status-bar';

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

    constructor(private store: Store, private nav: NavController, private statusBar: StatusBar, private viewController: ViewController)
    {
        this.store.dispatch(new SetClusterId('new'));
    }

    ionViewWillEnter()
    {
        this.statusBar.styleDefault();
    }

    public navigateCategories(): void
    {
        this.nav.push('PagePublisherClusterCategories');
    }

    public navigateLocations(): void
    {
        this.nav.push('PagePublisherClusterLocations');
    }

    public dismissModal(): void
    {
        this.viewController.dismiss();
        this.statusBar.styleDefault();
    }
}
