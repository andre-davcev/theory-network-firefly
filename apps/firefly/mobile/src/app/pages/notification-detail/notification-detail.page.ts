import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { StateEvent, ActionUserAlertsGo, ActionUserAlertsDelete } from '@firefly/core';
import { Alert, Event } from '@firefly/cloud';
import { Pages } from '@firefly/mobile';
import { BaseComponent } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';

@Component
({
    selector    : 'app-page-notification-detail',
    templateUrl : 'notification-detail.page.html',
    styleUrls   : ['./notification-detail.page.scss']
})

export class PageNotificationDetail extends BaseComponent
{
    @Select(StateEvent.image)      image$:           Observable<string>;
    @Select(StateEvent.data())     event$:           Observable<any>;
    @Select(StateEvent.canEdit)    canEdit$:         Observable<boolean>;

    public Pages: any = Pages;

    constructor
    (
        private store: Store,
        private modal: ModalController,
    )
    {
        super();
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

        this.store.dispatch(new Navigate([Pages.AssetEvent, event.id]));
    }


    public go()
    {
        const alert: Alert = this.store.selectSnapshot(StateEvent.data());

        this.store.dispatch(new ActionUserAlertsGo(alert));
    }

    public delete(): void
    {
        const alert: Alert = this.store.selectSnapshot(StateEvent.data());

        this.store.dispatch(new ActionUserAlertsDelete(alert.id));
    }
}
