import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';

import { StateCluster } from '../../state/cluster/cluster.state';
import { SetClusterId } from '../../state/cluster/cluster.actions';


@Component
({
    selector    : 'app-page-cluster',
    templateUrl : 'cluster.page.html',
    styleUrls   : ['./cluster.page.scss']
})

export class PagePublisherCluster
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

    segment:string = 'clusters';

    constructor(private store: Store, private nav: NavController, private viewController: ViewController, private router: Router)
    {
        this.store.dispatch(new SetClusterId('new'));
    }

    ionViewWillEnter()
    {
//        this.statusBar.styleDefault();
    }

    public navigateCategories(): void
    {
        this.router.navigate(['/publisher/cluster/categories']);
    }

    public navigateLocations(): void
    {
        this.router.navigate(['/publisher/cluster/locations']);
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
//        this.statusBar.styleDefault();
    }
}
