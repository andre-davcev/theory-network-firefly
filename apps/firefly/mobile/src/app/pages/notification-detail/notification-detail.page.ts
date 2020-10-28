import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AlertController, ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { StateEvent, ActionUserAlertsGo, ActionUserAlertsDelete, Translation } from '@firefly/core';
import { Alert, Event } from '@firefly/cloud';
import { Pages } from '@firefly/mobile';
import { BaseComponent } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

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
        private store     : Store,
        private modal     : ModalController,
        private translate : TranslateService,
        private alert     : AlertController
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

        this.store.dispatch(new Navigate([Pages.EventDetail, event.id]));
    }


    public go()
    {
        const alert: Alert = this.store.selectSnapshot(StateEvent.data());

        this.store.dispatch(new ActionUserAlertsGo(alert));
    }

    public delete(): void
    {
        this.translate.get
        ([
              Translation.AlertConfirmDeleteHeader,
              Translation.AlertConfirmDeleteMessage,
              Translation.AlertConfirmDeleteCancel,
              Translation.AlertConfirmDeleteConfirm,
              Translation.AlertConfirmDeleteEvent
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                this.alert.create
                ({
                    cssClass : 'cpt-alert',
                    header   : `${translations[Translation.AlertConfirmDeleteHeader]} ${translations[Translation.AlertConfirmDeleteEvent]}?`,
                    message  : translations[Translation.AlertConfirmDeleteMessage],

                    buttons:
                    [
                        {
                            text : translations[Translation.AlertConfirmDeleteCancel],
                            role : 'cancel'
                        },
                        {
                            text    : translations[Translation.AlertConfirmDeleteConfirm],
                            handler : () => this.store.dispatch(new ActionUserAlertsDelete(this.store.selectSnapshot(StateEvent.id())))
                        }
                    ]
                })
            ),
            switchMap((alert: HTMLIonAlertElement) =>
                from(alert.present())
            )
        ).
        subscribe();
    }
}
