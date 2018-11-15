import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';
import { StateCluster, ActionSetClusterId } from '@firefly/core';
import { ModalController } from '@ionic/angular';

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

    constructor(private store: Store, private modalController: ModalController)
    {
        this.store.dispatch(new ActionSetClusterId('new'));
    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public dismiss(): void
    {
        this.modalController.dismiss();
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
}
