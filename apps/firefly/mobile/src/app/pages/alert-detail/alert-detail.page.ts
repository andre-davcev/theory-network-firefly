import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { StateEvent, ActionUserAlertsGo } from '@firefly/core';
import { Pages } from '@firefly/mobile';
import { BaseComponent } from '@theory/core';

@Component
({
    selector    : 'app-page-alert-detail',
    templateUrl : 'alert-detail.page.html',
    styleUrls   : ['./alert-detail.page.scss']
})

export class PageAlertDetail extends BaseComponent implements OnInit
{
    @Select(StateEvent.imageUrl)        imageUrl$:        Observable<string>;
    @Select(StateEvent.data())          event$:           Observable<any>;
    public Pages: any = Pages;

    constructor
    (
        private store:         Store,
        private modal:         ModalController,
    )
    {
      super();
    }

    public ngOnInit(): void
    {

    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light }));
    }

    public alertGo()
    {
      this.store.dispatch(new ActionUserAlertsGo()).subscribe();
    }

    public cancel(): void
    {
        this.modal.dismiss();
    }
}
