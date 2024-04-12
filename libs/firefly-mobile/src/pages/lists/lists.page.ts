import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  IonSearchbar,
  MenuController,
  PopoverController
} from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import algoliaSearch, { SearchIndex } from 'algoliasearch/lite';
import { Observable, from, of } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';

import {
  Event,
  Interest,
  StreamInterest,
  SubscriptionPartial
} from '@firefly/cloud';
import {
  ActionAppLoadingShow,
  ActionInterestEventsGetAnonymous,
  ActionInterestGet,
  ActionInterestSetId,
  ActionInterestsPage,
  ActionInterestsSubscriptionOnOff,
  ActionInterestsSubscriptionToggle,
  ActionSearchEvents,
  ActionSearchInterests,
  ActionSearchReset,
  IconType,
  Pages,
  StateAlerts,
  StateApp,
  StateCalendar,
  StateInterest,
  StateInterests,
  StateSearch,
  StateUser
} from '@firefly/shared';
import { BaseComponent, CoreEnum } from '@theory/core';
import { TimestampFormat } from '@theory/firebase';

import { Style } from '@capacitor/status-bar';
import { ActionDeviceStatusBarSet, StateLocation } from '@theory/capacitor';

import { ComponentHomeOptions } from '../../components';
import { ActionMobileAuthSelect, StateMobile } from '../../state';

@Component({
  selector: 'app-page-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['./lists.page.scss']
})
export class PageLists extends BaseComponent implements OnInit {
  @Select(StateUser.isUser) isUser$!: Observable<boolean>;
  @Select(StateInterest.events) events$!: Observable<Event[]>;
  @Select(StateInterests.data) data$!: Observable<Array<StreamInterest>>;
  @Select(StateInterests.found) found$!: Observable<boolean>;
  @Select(StateInterests.empty) empty$!: Observable<boolean>;
  @Select(StateInterests.add) add$!: Observable<boolean>;
  @Select(StateUser.subscriptionsStatus) subscriptions$!: Observable<
    Record<string, SubscriptionPartial>
  >;
  @Select(StateInterests.emptyMessage) emptyMessage$!: Observable<string>;
  @Select(StateSearch.searchResults) searchResults$!: Observable<
    Array<Interest>
  >;
  @Select(StateSearch.searchResultsFound)
  searchResultsFound$!: Observable<boolean>;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;
  @Select(StateAlerts.unreadCount) unreadCount$!: Observable<number>;
  @Select(StateAlerts.unreadExists) unreadExists$!: Observable<boolean>;
  @Select(StateUser.authenticated) authenticated$!: Observable<boolean>;
  @Select(StateLocation.permissionDenied) locationDenied$!: Observable<boolean>;

  @ViewChild(IonSearchbar, { static: false })
  private searchbar!: IonSearchbar;

  public searching: boolean = false;

  public Pages: any = Pages;

  public searchClient = algoliaSearch(
    '8NDQ1FNIDU',
    '45b11751dc7e276f781a85f719abda66'
  );
  public index: SearchIndex = this.searchClient.initIndex('interests');

  public currentlyOpenedItemIndex = -1;
  public currentlyOpenedItems: Array<boolean> = [];
  public interestEvents: Array<Array<Event> | null> = [];
  public spinner: Array<boolean> = [];
  public subscriptions: Record<string, SubscriptionPartial> = {};

  public IconType: any = IconType;
  public TimestampFormat: any = TimestampFormat;

  @ViewChild(IonInfiniteScroll)
  public infiniteScroll!: IonInfiniteScroll;

  constructor(
    private store: Store,
    private menu: MenuController,
    private popover: PopoverController
  ) {
    super();
  }

  public ngOnInit(): void {
    this.subscriptions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (subscriptions: Record<string, SubscriptionPartial>) =>
          (this.subscriptions = subscriptions)
      );
  }

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public navigate(type: Pages): void {
    const url: Array<any> =
      type === Pages.EventDetail ? [type, CoreEnum.IdNew] : [type];

    this.store.dispatch(new Navigate([Pages.Tabs, Pages.Lists, ...url]));
  }

  public go(type: Pages.Notifications | Pages.Events): void {
    this.store.dispatch(new Navigate([Pages.Tabs, type]));
  }

  public menuOpen(): void {
    this.isUser$
      .pipe(
        take(1),
        switchMap((isUser: boolean) =>
          isUser
            ? from(this.menu.open())
            : this.store.dispatch(new ActionMobileAuthSelect())
        )
      )
      .subscribe();
  }

  public async showPopover(event: any): Promise<void> {
    const isStream: boolean = this.store.selectSnapshot(
      StateApp.onTab(Pages.Lists)
    );

    const popover: HTMLIonPopoverElement = await this.popover.create({
      component: ComponentHomeOptions,
      componentProps: {
        interestType: this.store.selectSnapshot(StateInterests.type),
        eventType: this.store.selectSnapshot(StateCalendar.type),
        isStream,
        virtual: isStream
          ? this.store.selectSnapshot(StateInterests.virtual)
          : this.store.selectSnapshot(StateCalendar.virtual)
      },
      event,
      translucent: true
    });

    return await popover.present();
  }

  public searchShow(show: boolean): void {
    this.searching = show;

    if (show) {
      this.searchbar.setFocus();
    }
  }

  public cancel(): void {
    this.store.dispatch(new ActionSearchReset()).subscribe();
  }

  public search(event: CustomEvent) {
    if (event.detail.value.length < 3) return;

    const pageStream: boolean = this.store.selectSnapshot(
      StateApp.onTab(Pages.Lists)
    );
    const pageAlerts: boolean = this.store.selectSnapshot(
      StateApp.onTab(Pages.Notifications)
    );

    return pageStream
      ? this.store
          .dispatch(new ActionSearchInterests(event.detail.value))
          .subscribe()
      : pageAlerts
      ? this.store
          .dispatch(new ActionSearchEvents(event.detail.value))
          .subscribe()
      : of(null);
  }

  public toggle(subscribed: boolean, stream: StreamInterest): void {
    this.isUser$
      .pipe(
        take(1),
        switchMap((authenticated: boolean) =>
          authenticated
            ? this.store.dispatch(
                new ActionInterestsSubscriptionToggle(stream.id, true)
              )
            : this.store.dispatch(new ActionMobileAuthSelect())
        )
      )
      .subscribe();
  }

  public toggleOn(on: boolean, interest: StreamInterest): void {
    this.store.dispatch(new ActionInterestsSubscriptionOnOff(interest.id, on));
  }

  public setOpened(itemIndex: number, interest: Interest): void {
    this.currentlyOpenedItemIndex = itemIndex;
    this.currentlyOpenedItems[itemIndex] = true;
    this.spinner[itemIndex] = true;

    this.store
      .dispatch(new ActionInterestSetId(interest.id))
      .pipe(
        switchMap(() =>
          this.store.dispatch(new ActionInterestEventsGetAnonymous())
        ),
        tap(() => {
          const events = this.store.selectSnapshot(StateInterest.events);
          this.interestEvents[itemIndex] = events;
          this.spinner[itemIndex] = false;
        })
      )
      .subscribe();
  }

  public setClosed(itemIndex: number): void {
    this.interestEvents[itemIndex] = null;
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  public selectInterest(interest: Interest) {
    this.store.dispatch([
      new ActionAppLoadingShow(),
      new Navigate([Pages.Tabs, Pages.Lists, Pages.InterestDetail], {
        id: interest.id
      })
    ]);
  }

  public selectSearchInterest(interest: Interest) {
    this.store
      .dispatch(new ActionSearchReset())
      .pipe(
        switchMap(() =>
          this.store.dispatch(new ActionInterestGet(interest.id))
        ),
        switchMap(() =>
          this.store.dispatch([
            new ActionAppLoadingShow(),
            new ActionSearchReset(),
            new Navigate([Pages.Tabs, Pages.Lists, Pages.InterestDetail], {
              id: interest.id
            })
          ])
        )
      )
      .subscribe();
  }

  public resetSearchResults() {
    this.store.dispatch(new ActionSearchReset()).subscribe();
  }

  public add(): void {
    this.store.dispatch(
      new Navigate([Pages.Tabs, Pages.Lists, Pages.AssetInterest])
    );
  }

  public loadData(event: any): void {
    this.store.dispatch(new ActionInterestsPage(this.infiniteScroll));
  }

  public select(event: Event): void {
    this.store
      .dispatch(
        new Navigate(
          [Pages.Tabs, Pages.Notifications, Pages.NotificationDetail, event.id],
          { isEvent: true }
        )
      )
      .subscribe();
  }
  /*
    public filterChanged(event: any): void
    {
      if(event.target.value === 'all')
      {
        this.stream = this.store.selectSnapshot(StateUserStream.data());
      }
      else if(event.target.value === 'unsubscribed')
      {
        this.stream = this.store.selectSnapshot(StateUser.stream);
      }
      else if(event.target.value === 'subscribed')
      {
        this.stream = this.store.selectSnapshot(StateUser.subscribedStream);
      }
    }
*/
}
