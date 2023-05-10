import { Component, ViewChild } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { ActionCalendarPage, ActionCalendarSetType, ActionEventSet, EventType, IconType, StateCalendar, StateUserEvents } from '@firefly/shared';
import { Alert, DateEvents } from '@firefly/cloud';

@Component
({
    selector    : 'app-page-event-selector',
    templateUrl : 'event-selector.page.html',
    styleUrls   : ['./event-selector.page.scss']
})

export class PageEventSelector
{
    @Select(StateCalendar.data)   data$   : Observable<Array<DateEvents>>;
    @Select(StateCalendar.exists) exists$ : Observable<boolean>;

    @ViewChild(IonInfiniteScroll)
    private infiniteScroll: IonInfiniteScroll;

    private type: EventType;

    public IconType: any = IconType;

    constructor
    (
        private store: Store,
        private modal: ModalController
    ) { }

    public ionViewWillEnter(): void
    {
        this.type = this.store.selectSnapshot(StateCalendar.type);

        this.store.dispatch(new ActionCalendarSetType(EventType.Created));
        this.store.dispatch(new ActionDeviceStatusBarSet({style: Style.Light}));
    }

    public select(event: Alert): void
    {
        const snapshot = this.store.selectSnapshot(StateUserEvents.snapshotLookup())[event.id];

        this.store.dispatch
        ([
            new ActionCalendarSetType(this.type),
            new ActionEventSet(snapshot)
        ]).
        pipe
        (
            switchMap(() =>
                from(this.modal.dismiss(event))
            )
        ).
        subscribe()
    }

    public cancel(): void
    {
        this.store.dispatch(new ActionCalendarSetType(this.type));
        this.modal.dismiss();
    }

    public loadData(event: any): void
    {
        this.store.dispatch(new ActionCalendarPage(this.infiniteScroll));
    }
}
