import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { StateEvent, ActionEventAccept, ActionEventDeny, ActionInterestEventsGetAnonymous, StateInterest } from '@firefly/core';
import { Event } from '@firefly/cloud';
import { Pages } from '@firefly/mobile';
import { BaseComponent } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';
import { switchMap } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-event-detail',
    templateUrl : 'event-detail.page.html',
    styleUrls   : ['./event-detail.page.scss']
})

export class PageEventDetail extends BaseComponent implements OnInit
{
    @Select(StateEvent.image)      image$:           Observable<string>;
    @Select(StateEvent.data())     event$:           Observable<any>;
    @Select(StateEvent.canEdit)    canEdit$:         Observable<boolean>;
    @Select(StateInterest.canEdit) canEditInterest$: Observable<boolean>;
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

    public acceptEvent(): void
    {
      this.store.dispatch(new ActionEventAccept()).pipe
      (
        switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
      ).subscribe();
    }

    public denyEvent(): void
    {
      this.store.dispatch(new ActionEventDeny()).pipe
      (
        switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
      ).subscribe();
    }
}
