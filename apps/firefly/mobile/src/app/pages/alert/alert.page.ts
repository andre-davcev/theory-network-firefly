import { Component, ViewChild } from '@angular/core';
import { switchMap, filter } from 'rxjs/operators';
import { IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { StateUserAlerts, ActionEventGet, ActionUserAlertsGo, IconType, ActionUserAlertsDelete, ActionUserEventsReset } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages, ActionMobileSlideAlertIndex, ActionMobileSlideAlertRestore, StateMobile } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { PageAlertDetail } from '../alert-detail/alert-detail.page';
import { BaseComponent } from '@theory/core';

@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert extends BaseComponent
{
    @Select(StateUserAlerts.list)          alerts$    : Observable<Array<Alert>>;
    @Select(StateUserAlerts.listEmpty)     empty$     : Observable<boolean>;
    @Select(StateUserAlerts.hasUnreadList) hasUnread$ : Observable<boolean>;

    @ViewChild('slider', { static: false })
    protected sliderRef: IonSlides;

    public slideOptions: any = { zoom: false };

    public Pages    : any = Pages;
    public IconType : any = IconType;

    // https://github.com/ionic-team/ionic/issues/20356
    public didInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor
    (
        private store: Store,
        private modal: ModalController
    )
    {
        super();
    }

    public ionViewWillEnter(): void
    {
        // https://github.com/ionic-team/ionic/issues/20356
        this.didInit$.next(true);

        this.store.dispatch(new ActionMobileSlideAlertRestore(this.sliderRef));
    }

    public slideChanged(): void
    {
        from(this.sliderRef.getActiveIndex()).
        pipe
        (
            filter((index: number) =>
                index !== this.store.selectSnapshot(StateMobile.indexAlerts)
            ),
            switchMap((index: number) =>
                this.store.dispatch(new ActionMobileSlideAlertIndex(index))
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
        this.store.dispatch(new ActionUserAlertsDelete(alert.id));
    }

    public navigate(object: Alert): void
    {
        this.store.dispatch(new ActionUserEventsReset()).pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionEventGet(object.id))
            ),
            switchMap(() =>
                this.store.dispatch(new Navigate([Pages.AlertDetail, object.id]))
            )
        ).
        subscribe();
    }

    public done(): void
    {
        this.modal.dismiss();
    }
}
