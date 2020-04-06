import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { switchMap, filter } from 'rxjs/operators';
import { IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';

import { StateUserAlerts, ActionEventGet, ActionUserAlertsGo, IconType, ActionAlertSetId, ActionAlertDelete, StateAlert, StateUser, EventType } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages, ActionMobileSlideAlertIndex, ActionMobileSlideAlertRestore, StateMobile } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { PageAlertDetail } from '../alert-detail/alert-detail.page';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@theory/core';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert extends BaseComponent implements AfterViewInit
{
    @Select(StateAlert.formGroup())        form$:      Observable<FormGroup>;
    @Select(StateUserAlerts.unreadList)    unread$:    Observable<Array<Alert>>;
    @Select(StateUserAlerts.found())       found$:     Observable<boolean>;
    @Select(StateUserAlerts.hasUnreadList) hasUnread$: Observable<boolean>;
    @Select(StateUser.eventType)           eventType$: Observable<EventType>;
    @Select(StateUser.eventsEmptyMessage)  emptyMessage$:  Observable<string>;

    @ViewChild('sliderRef', { static: false }) protected sliderRef: IonSlides;

    public segment: string = 'fired';
    public Pages: any = Pages;
    public slideOptions: any = { zoom: false };

    public IconType  : any = IconType;
    public EventType : any = EventType;

    // https://github.com/ionic-team/ionic/issues/20356
    public didInit: boolean = false;

    constructor(private store: Store, private modal: ModalController)
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        // https://github.com/ionic-team/ionic/issues/20356
        this.didInit = true;
    }

    public ionViewWillEnter(): void
    {
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

    public alertDetail(alert: Alert): void
    {
        this.store.dispatch(new ActionEventGet(alert.eventId)).
        pipe
        (
            switchMap(() =>
                from(this.modal.create({
                    component: PageAlertDetail
                }))
            )
        ).
        subscribe((modal: HTMLIonModalElement) =>
            modal.present()
        );
    }

    public alertGo()
    {
        this.store.dispatch(new ActionUserAlertsGo());
    }

    public alertDelete(alert: Alert): void
    {
        this.store.dispatch(new ActionAlertSetId(alert.id)).
        pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionAlertDelete())
            )
        ).
        subscribe();
    }

    public navigate(page: Pages.AlertsList | Pages.AlertDetail, object: Alert): void
    {
      if(page === Pages.AlertsList)
        this.store.dispatch(new Navigate([page]));
      else
        this.store.dispatch(new ActionEventGet(object.eventId)).pipe
        (
          switchMap(() => this.store.dispatch(new Navigate([page, object.id])))
        ).subscribe();
    }
}
