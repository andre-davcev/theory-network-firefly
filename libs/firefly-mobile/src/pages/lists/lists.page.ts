import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  MenuController,
  PopoverController
} from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { Event, List, StreamList, SubscriptionPartial } from '@firefly/cloud';
import {
  ActionAppLoadingShow,
  ActionListEventsGetAnonymous,
  ActionListSetId,
  ActionListsPage,
  ActionListsSubscriptionOnOff,
  ActionListsSubscriptionToggle,
  ActionListsTagSet,
  Colors,
  IconType,
  Pages,
  StateApp,
  StateCalendar,
  StateList,
  StateLists,
  StateUser,
  TagList
} from '@firefly/shared';
import { BaseComponent, CoreEnum } from '@theory/core';
import { TimestampFormat } from '@theory/firebase';

import { Style } from '@capacitor/status-bar';
import { ActionDeviceStatusBarSet, StateLocation } from '@theory/capacitor';

import { Tag } from '@theory/ionic';
import { StateTags } from 'libs/firefly-shared/src/state/basic/tags';
import { ComponentHomeOptions } from '../../components';
import { ActionMobileAuthSelect, StateMobile } from '../../state';

@Component({
  selector: 'app-page-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['./lists.page.scss']
})
export class PageLists extends BaseComponent implements OnInit {
  @Select(StateUser.isUser) isUser$!: Observable<boolean>;
  @Select(StateList.events) events$!: Observable<Event[]>;
  @Select(StateLists.data) data$!: Observable<Array<StreamList>>;
  @Select(StateLists.found) found$!: Observable<boolean>;
  @Select(StateLists.empty) empty$!: Observable<boolean>;
  @Select(StateLists.add) add$!: Observable<boolean>;
  @Select(StateUser.subscriptionsStatus) subscriptions$!: Observable<
    Record<string, SubscriptionPartial>
  >;
  @Select(StateLists.emptyMessage) emptyMessage$!: Observable<string>;
  // @Select(StateSearch.searchResults) searchResults$!: Observable<
  //   Array<List>
  // >;
  // @Select(StateSearch.searchResultsFound)
  searchResultsFound$!: Observable<boolean>;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;
  @Select(StateUser.authenticated) authenticated$!: Observable<boolean>;
  @Select(StateLocation.permissionDenied) locationDenied$!: Observable<boolean>;
  @Select(StateTags.tagsLists) tagsLists$!: Observable<Array<Tag<TagList>>>;
  @Select(StateLists.tagIndex) tagIndex$!: Observable<number>;

  // @ViewChild(IonSearchbar, { static: false })
  // private searchbar!: IonSearchbar;

  // public searching: boolean = false;

  public Pages: any = Pages;
  public Colors: any = Colors;

  // public searchClient = algoliaSearch(
  //   '8NDQ1FNIDU',
  //   '45b11751dc7e276f781a85f719abda66'
  // );
  // public index: SearchIndex = this.searchClient.initIndex('lists');

  public currentlyOpenedItemIndex = -1;
  public currentlyOpenedItems: Array<boolean> = [];
  public listEvents: Array<Array<Event> | null> = [];
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
        eventType: this.store.selectSnapshot(StateCalendar.type),
        isStream,
        virtual: isStream
          ? this.store.selectSnapshot(StateLists.virtual)
          : this.store.selectSnapshot(StateCalendar.virtual)
      },
      event,
      translucent: true
    });

    return await popover.present();
  }
  /*
  public searchShow(show: boolean): void {
    this.searching = show;

    if (show) {
      this.searchbar.setFocus();
    }
  }
*/

  /*
  public cancel(): void {
    this.store.dispatch(new ActionSearchReset()).subscribe();
  }
*/

  /*
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
          .dispatch(new ActionSearchLists(event.detail.value))
          .subscribe()
      : pageAlerts
      ? this.store
          .dispatch(new ActionSearchEvents(event.detail.value))
          .subscribe()
      : of(null);
  }
*/

  public toggle(subscribed: boolean, stream: StreamList): void {
    this.isUser$
      .pipe(
        take(1),
        switchMap((authenticated: boolean) =>
          authenticated
            ? this.store.dispatch(
                new ActionListsSubscriptionToggle(stream.id, true)
              )
            : this.store.dispatch(new ActionMobileAuthSelect())
        )
      )
      .subscribe();
  }

  public toggleOn(on: boolean, list: StreamList): void {
    this.store.dispatch(new ActionListsSubscriptionOnOff(list.id, on));
  }

  public setOpened(itemIndex: number, list: List): void {
    this.currentlyOpenedItemIndex = itemIndex;
    this.currentlyOpenedItems[itemIndex] = true;
    this.spinner[itemIndex] = true;

    this.store
      .dispatch(new ActionListSetId(list.id))
      .pipe(
        switchMap(() =>
          this.store.dispatch(new ActionListEventsGetAnonymous())
        ),
        tap(() => {
          const events = this.store.selectSnapshot(StateList.events);
          this.listEvents[itemIndex] = events;
          this.spinner[itemIndex] = false;
        })
      )
      .subscribe();
  }

  public setClosed(itemIndex: number): void {
    this.listEvents[itemIndex] = null;
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  public selectList(list: List) {
    const isUser: boolean = this.store.selectSnapshot(StateUser.isUser);

    if (isUser) {
      this.store.dispatch([
        new ActionAppLoadingShow(),
        new Navigate([Pages.Tabs, Pages.Lists, Pages.ListDetail], {
          id: list.id
        })
      ]);
    } else {
      this.store.dispatch(new ActionMobileAuthSelect());
    }
  }

  /*
  public selectSearchList(list: List) {
    this.store
      .dispatch(new ActionSearchReset())
      .pipe(
        switchMap(() =>
          this.store.dispatch(new ActionListGet(list.id))
        ),
        switchMap(() =>
          this.store.dispatch([
            new ActionAppLoadingShow(),
            new ActionSearchReset(),
            new Navigate([Pages.Tabs, Pages.Lists, Pages.ListDetail], {
              id: list.id
            })
          ])
        )
      )
      .subscribe();
  }
*/

  /*
  public resetSearchResults() {
    this.store.dispatch(new ActionSearchReset()).subscribe();
  }
*/

  public add(): void {
    this.store.dispatch(
      new Navigate([Pages.Tabs, Pages.Lists, Pages.AssetList])
    );
  }

  public loadData(event: any): void {
    this.store.dispatch(new ActionListsPage(this.infiniteScroll));
  }

  public select(event: Event): void {
    const isUser: boolean = this.store.selectSnapshot(StateUser.isUser);

    if (isUser) {
      const pageDetail: Pages = this.store.selectSnapshot(StateList.isOwner)
        ? Pages.EventDetail
        : Pages.NotificationDetail;

      this.store.dispatch(
        new Navigate([Pages.Tabs, Pages.Lists, pageDetail, event.id], {
          isEvent: true
        })
      );
    } else {
      this.store.dispatch(new ActionMobileAuthSelect());
    }
  }

  public chipSelected(tag: Tag<TagList>): void {
    this.store.dispatch(new ActionListsTagSet(tag));
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
