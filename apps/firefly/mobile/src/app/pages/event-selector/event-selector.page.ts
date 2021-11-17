import { Component, ViewChild } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { ActionCalendarPage, StateCalendar } from '@firefly/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Observable } from 'rxjs';
import { Alert, DateEvents } from '@firefly/cloud';

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
        this.modal.dismiss(event)
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
