import { Component, ViewChild } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { ActionCalendarPage, ActionEventInterestAdd, ActionEventSetId, StateCalendar, StateInterest } from '@firefly/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Observable } from 'rxjs';
import { Alert, DateEvents, Interest } from '@firefly/cloud';
import { switchMap } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-event-selector',
    templateUrl : 'event-selector.page.html',
    styleUrls   : ['./event-selector.page.scss']
})

export class PageEventSelector
{
    @Select(StateCalendar.data) data$: Observable<Array<DateEvents>>;

    @ViewChild(IonInfiniteScroll)
    private infiniteScroll: IonInfiniteScroll;

    constructor
    (
        private store: Store,
        private modal: ModalController
    ) { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public select(event: Alert): void
    {
        const interest: Interest = this.store.selectSnapshot(StateInterest.data());

        this.store.dispatch(new ActionEventSetId(event.id)).
        pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionEventInterestAdd(interest, true))
            )
        ).
        subscribe(() =>
            this.modal.dismiss()
        );

        // ToDo: Save the interest to the database?
        // ToDo: Add confirm message here?
        // ToDo: Also add new scenarios from new features
    }

    public cancel(): void
    {
        this.modal.dismiss();
    }

    public loadData(event: any): void
    {
        this.store.dispatch(new ActionCalendarPage(this.infiniteScroll));
    }
}
