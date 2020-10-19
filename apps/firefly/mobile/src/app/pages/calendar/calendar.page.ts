import { Component, ViewChild } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { MenuController, PopoverController, IonSearchbar, IonInfiniteScroll } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent, CoreEnum } from '@theory/core';
import { Alert, Event, DateEvents, Interest } from '@firefly/cloud';
import {
    ActionEventGet,
    IconType,
    StateUser,
    EventType,
    ActionInterestReset,
    ActionInterestGet,
    ActionUserEventsDelete,
    ActionUserEventsReset,
    StateUserEvents,
    ActionEventSet
} from '@firefly/core';
import {
    ActionMobileAuthSelect,
    ComponentHomeOptions,
    ActionSearchEvents,
    Pages,
    StateMobile,
    StateSearch,
    ActionSearchReset,
    ActionMobileLoadingShow,
    ActionMobilePageEvents
} from '@firefly/mobile';
import algoliaSearch, { SearchIndex, SearchClient } from 'algoliasearch/lite';

@Component
({
    selector    : 'app-page-calendar',
    templateUrl : 'calendar.page.html',
    styleUrls   : ['./calendar.page.scss']
})

export class PageCalendar extends BaseComponent
{
    @Select(StateUser.isPublisher)           isPublisher$        : Observable<boolean>;
    @Select(StateUserEvents.list)            events$             : Observable<Array<DateEvents>>;
    @Select(StateUserEvents.listEmpty)       empty$              : Observable<boolean>;
    @Select(StateUserEvents.add)             add$                : Observable<boolean>;
    @Select(StateUser.eventType)             eventType$          : Observable<EventType>;
    @Select(StateUser.eventsEmptyMessage)    emptyMessage$       : Observable<string>;
    @Select(StateSearch.searchResults)       searchResults$      : Observable<Array<Interest>>;
    @Select(StateSearch.searchResultsFound)  searchResultsFound$ : Observable<boolean>;
    @Select(StateMobile.menuOpen)            menuOpen$           : Observable<boolean>;
    @Select(StateUser.authenticated)         authenticated$      : Observable<boolean>;

    public Pages     : any = Pages;
    public IconType  : any = IconType;

    @ViewChild(IonSearchbar, { static: false })
    private searchbar : IonSearchbar;

    @ViewChild(IonInfiniteScroll)
    private infiniteScroll: IonInfiniteScroll;

    public  searching    : boolean = false;
    public  searchClient : SearchClient = algoliaSearch('8NDQ1FNIDU','45b11751dc7e276f781a85f719abda66');
    public  index        : SearchIndex = this.searchClient.initIndex('interests');

    constructor
    (
        private store   : Store,
        private menu    : MenuController,
        private popover : PopoverController
    )
    {
        super();
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public delete(event: Event): void
    {
        this.store.dispatch(new ActionUserEventsDelete(event.id));
    }

    public navigate(object: Alert): void
    {
        const page: Pages = object.read == null ?
            Pages.EventDetail :
            Pages.NotificationDetail;

        this.store.dispatch(new Navigate([page, object.id]));
    }

    public add(): void
    {
        this.store.dispatch
        ([
            new ActionInterestReset(),
            new Navigate([Pages.EventDetail, CoreEnum.IdNew])
        ]);
    }

    public resetSearchResults()
    {
        this.store.dispatch(new ActionSearchReset()).subscribe();
    }

    public selectSearchInterest(interest: Interest)
    {
        this.store.dispatch(new ActionSearchReset()).
        pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionInterestGet(interest.id))),
            switchMap(() =>
                this.store.dispatch
                ([
                    new ActionMobileLoadingShow(),
                    new ActionSearchReset(),
                    new Navigate([Pages.InterestDetail], {id: interest.id})
                ]))
        ).
        subscribe();
    }

    public menuOpen(): void
    {
        this.authenticated$.pipe
        (
            take(1),
            switchMap((authenticated: boolean) =>
                authenticated ?
                    from(this.menu.open()) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
    }

    public async showPopover(event: any): Promise<void>
    {
        const isStream: boolean = this.store.selectSnapshot(StateMobile.pageStream);

        const popover: HTMLIonPopoverElement = await this.popover.create
        ({
            component: ComponentHomeOptions,
            componentProps:
            {
                interestType : this.store.selectSnapshot(StateUser.interestType),
                eventType    : this.store.selectSnapshot(StateUser.eventType),
                isStream     : false,
                virtual      : this.store.selectSnapshot(StateUser.eventVirtual)

            },
            event,
            translucent: true
        });

        return await popover.present();
    }

    public searchShow(show: boolean): void
    {
        this.searching = show;

        if (show)
        {
            this.searchbar.setFocus();
        }
    }

    public cancel(): void
    {
        this.store.dispatch(new ActionSearchReset()).subscribe();
    }

    public search(event: CustomEvent)
    {
        if(event.detail.value.length < 3)
            return;

        this.store.dispatch(new ActionSearchEvents(event.detail.value));
    }

    public loadData(event): void
    {
        this.store.dispatch(new ActionMobilePageEvents(this.infiniteScroll));
    }
}
