import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { StateEvent } from '@firefly/core';
import { Event } from '@firefly/cloud';
import { Pages } from '@firefly/mobile';
import { BaseComponent } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';

@Component
({
    selector    : 'app-page-event-detail',
    templateUrl : 'event-detail.page.html',
    styleUrls   : ['./event-detail.page.scss']
})

export class PageEventDetail extends BaseComponent implements OnInit
{
    @Select(StateEvent.imageUrl)        imageUrl$:        Observable<string>;
    @Select(StateEvent.data())          event$:           Observable<any>;
    @Select(StateEvent.canEdit)         canEdit$:         Observable<boolean>;
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

    public cancel(): void
    {
        this.modal.dismiss();
    }

    public edit(): void
    {
      const event: Event = this.store.selectSnapshot(StateEvent.data());
      this.store.dispatch([
        new Navigate([Pages.AssetEvent, event.id])
      ]).subscribe();
    }
}
