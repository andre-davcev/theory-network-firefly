import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { switchMap, filter } from 'rxjs/operators';
import { IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';

import { StateUserAlerts, ActionEventGet, ActionUserAlertsGo, IconType, ActionAlertSetId, ActionAlertDelete, StateAlert, StateUser, EventType, ActionInterestReset, ActionInterestGet, ActionUserAlertsDelete, ActionUserEventsDelete, ActionEventImageSet, ActionUserEventsReset } from '@firefly/core';
import { Alert, Event, DateEvents, Interest } from '@firefly/cloud';

import { Pages, ActionMobileSlideAlertIndex, ActionMobileSlideAlertRestore, StateMobile, StateSearch, ActionSearchReset, ActionMobileLoadingShow } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { PageAlertDetail } from '../alert-detail/alert-detail.page';
import { FormGroup } from '@angular/forms';
import { BaseComponent, CoreEnum } from '@theory/core';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert extends BaseComponent implements AfterViewInit
{
    @Select(StateAlert.formGroup())            form$:      Observable<FormGroup>;
    @Select(StateUserAlerts.eventsList)        events$:    Observable<Array<DateEvents> | Array<Alert>>;
    @Select(StateUserAlerts.eventsListEmpty)   empty$:     Observable<boolean>;
    @Select(StateUserAlerts.hasUnreadList)     hasUnread$: Observable<boolean>;
    @Select(StateUser.eventType)               eventType$: Observable<EventType>;
    @Select(StateUser.eventsEmptyMessage)      emptyMessage$:  Observable<string>;
    @Select(StateUserAlerts.eventsAdd)          add$:           Observable<boolean>;
    @Select(StateSearch.searchResults)      searchResults$:      Observable<Array<Interest>>;
    @Select(StateSearch.searchResultsFound) searchResultsFound$: Observable<boolean>;

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
        this.store.dispatch(new ActionEventGet(alert.id)).
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

    public alertGo(alert: Alert)
    {
        this.store.dispatch(new ActionUserAlertsGo(alert));
    }

    public eventDelete(event: Event): void
    {
        const eventType: EventType = this.store.selectSnapshot(StateUser.eventType);

        if (eventType !== EventType.Created)
        {
            this.store.dispatch(new ActionUserAlertsDelete(event.id));
        }
        else
        {
            this.store.dispatch(new ActionUserEventsDelete(event.id));
        }
    }

    public navigate(object: Alert): void
    {
        const page: Pages = object.read == null ?
            Pages.AssetEvent :
            Pages.AlertDetail;

        this.store.dispatch(new ActionUserEventsReset()).pipe
        (
            switchMap(() =>
               this.store.dispatch(new ActionEventGet(object.id))
            ),
            switchMap(() =>
                this.store.dispatch(new ActionEventImageSet())
            ),
            switchMap(() =>
                this.store.dispatch(new Navigate([page, object.id]))
            )
        ).
        subscribe();
    }

    public add(): void
    {
        this.store.dispatch
        ([
            new ActionInterestReset(),
            new Navigate([Pages.AssetEvent, CoreEnum.IdNew])
        ]);
    }

    public resetSearchResults()
    {
      this.store.dispatch(new ActionSearchReset()).subscribe();
    }


    public selectSearchInterest(interest: Interest)
    {
      this.store.dispatch(new ActionSearchReset()).pipe
      (
        switchMap(() =>
          this.store.dispatch(new ActionInterestGet(interest.id))),
        switchMap(() =>
          this.store.dispatch([
            new ActionMobileLoadingShow(),
            new ActionSearchReset(),
            new Navigate([Pages.InterestDetail], {id: interest.id})
          ]))
      ).subscribe();
    }
}
