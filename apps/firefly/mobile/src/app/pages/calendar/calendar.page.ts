import { Component, ViewChild } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { MenuController, PopoverController, IonSearchbar, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent, CoreEnum } from '@theory/core';
import { Alert, Event, DateEvents, Interest } from '@firefly/cloud';
import {
    IconType,
    StateUser,
    EventType,
    ActionInterestReset,
    ActionInterestGet,
    ActionUserEventsDelete,
    Translation,
    StateApp,
    ActionAppLoadingShow,
    ActionAppPageEvents
} from '@firefly/core';
import {
    ActionMobileAuthSelect,
    ComponentHomeOptions,
    ActionSearchEvents,
    Pages,
    StateMobile,
    StateSearch,
    ActionSearchReset
} from '@firefly/mobile';
import algoliaSearch, { SearchIndex, SearchClient } from 'algoliasearch/lite';
import { TranslateService } from '@ngx-translate/core';

@Component
({
    selector    : 'app-page-calendar',
    templateUrl : 'calendar.page.html',
    styleUrls   : ['./calendar.page.scss']
})

export class PageCalendar extends BaseComponent
{
    @Select(StateUser.isPublisher)           isPublisher$          : Observable<boolean>;
    @Select(StateApp.calendar)               calendar$             : Observable<Array<DateEvents>>;
    @Select(StateApp.calendarExists)         calendarExists$       : Observable<boolean>;
    @Select(StateApp.calendarCanAdd)         calendarCanAdd$       : Observable<boolean>;
    @Select(StateApp.calendarEmptyMessage)   emptyMessage$         : Observable<string>;
    @Select(StateApp.eventType)              eventType$            : Observable<EventType>;
    @Select(StateSearch.searchResults)       searchResults$        : Observable<Array<Interest>>;
    @Select(StateSearch.searchResultsFound)  searchResultsFound$   : Observable<boolean>;
    @Select(StateMobile.menuOpen)            menuOpen$             : Observable<boolean>;
    @Select(StateUser.authenticated)         authenticated$        : Observable<boolean>;

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
        private store     : Store,
        private menu      : MenuController,
        private popover   : PopoverController,
        private translate : TranslateService,
        private alert     : AlertController
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
                            handler : () => this.store.dispatch(new ActionUserEventsDelete(event.id))
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
                    new ActionAppLoadingShow(),
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
        // const isStream: boolean = this.store.selectSnapshot(StateMobile.pageStream);

        const popover: HTMLIonPopoverElement = await this.popover.create
        ({
            component: ComponentHomeOptions,
            componentProps:
            {
                interestType : this.store.selectSnapshot(StateApp.interestType),
                eventType    : this.store.selectSnapshot(StateApp.eventType),
                isStream     : false,
                virtual      : this.store.selectSnapshot(StateApp.eventVirtual)

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
        this.store.dispatch(new ActionAppPageEvents(this.infiniteScroll));
    }
}
