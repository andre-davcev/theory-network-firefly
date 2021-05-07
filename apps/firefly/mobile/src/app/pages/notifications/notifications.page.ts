import { Component, ViewChild } from '@angular/core';
import { switchMap, filter } from 'rxjs/operators';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { ActionUserAlertsGo, IconType, ActionUserAlertsDelete, Translation, StateApp, ActionAppSlideAlertRestore, ActionAppSlideAlertIndex } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages } from '@firefly/mobile';
import { BaseComponent } from '@theory/core';
import { TranslateService } from '@ngx-translate/core';

@Component
({
    selector    : 'app-page-notifications',
    templateUrl : 'notifications.page.html',
    styleUrls   : ['./notifications.page.scss']
})

export class PageNotifications extends BaseComponent
{
    @Select(StateApp.notifications)      notifications$      : Observable<Array<Alert>>;
    @Select(StateApp.notificationsExist) notificationsExist$ : Observable<boolean>;

    @ViewChild('slider', { static: false })
    protected sliderRef: IonSlides;

    public slideOptions: any = { zoom: false };

    public Pages    : any = Pages;
    public IconType : any = IconType;

    // https://github.com/ionic-team/ionic/issues/20356
    public didInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
        // https://github.com/ionic-team/ionic/issues/20356
        this.didInit$.next(true);

        setTimeout(() =>
            this.store.dispatch(new ActionAppSlideAlertRestore(this.sliderRef))
        );
    }

    public slideChanged(): void
    {
        from(this.sliderRef.getActiveIndex()).
        pipe
        (
            filter((index: number) =>
                index !== this.store.selectSnapshot(StateApp.notificationsIndex)
            ),
            switchMap((index: number) =>
                this.store.dispatch(new ActionAppSlideAlertIndex(index))
            )
        ).
        subscribe();
    }

    public go(alert: Alert)
    {
        this.store.dispatch(new ActionUserAlertsGo(alert));
    }

    public delete(alert: Alert): void
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
                            handler : () => this.store.dispatch(new ActionUserAlertsDelete(alert.id))
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

    public done(): void
    {
        this.modal.dismiss();
    }
}
