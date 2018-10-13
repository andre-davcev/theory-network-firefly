import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

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

    constructor(private store: Store)
    {
        this.store.dispatch(new SetClusterId('new'));
    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
}
