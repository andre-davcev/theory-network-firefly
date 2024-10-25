import { Component, ViewChild } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import {
  AlertController,
  IonInfiniteScroll,
  IonSearchbar,
  MenuController,
  PopoverController
} from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Alert, DateEvents, Event, List } from '@firefly/cloud';
import {
  ActionAppLoadingShow,
  ActionCalendarPage,
  ActionListGet,
  ActionListReset,
  ActionSearchEvents,
  ActionSearchReset,
  ActionUserEventsDelete,
  EventType,
  IconType,
  Pages,
  StateCalendar,
  StateLists,
  StateSearch,
  StateUser,
  Translation
} from '@firefly/shared';
import { TranslateService } from '@ngx-translate/core';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent, CoreEnum } from '@theory/core';
import algoliaSearch, { SearchClient, SearchIndex } from 'algoliasearch/lite';
import { ComponentHomeOptions } from '../../components';
import { ActionMobileAuthSelect, StateMobile } from '../../state';

@Component({
  selector: 'app-page-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class PageCalendar extends BaseComponent {
  @Select(StateUser.isPublisher) isPublisher$!: Observable<boolean>;
  @Select(StateCalendar.data) data$!: Observable<Array<DateEvents>>;
  @Select(StateCalendar.exists) exists$!: Observable<boolean>;
  @Select(StateCalendar.canAdd) canAdd$!: Observable<boolean>;
  @Select(StateCalendar.showEmpty) showEmpty$!: Observable<boolean>;
  @Select(StateCalendar.emptyMessage) emptyMessage$!: Observable<string>;
  @Select(StateCalendar.type) eventType$!: Observable<EventType>;
  @Select(StateSearch.searchResults) searchResults$!: Observable<Array<List>>;
  @Select(StateSearch.searchResultsFound)
  searchResultsFound$!: Observable<boolean>;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;
  @Select(StateUser.isUser) isUser$!: Observable<boolean>;

  public Pages: any = Pages;
  public IconType: any = IconType;

  @ViewChild(IonSearchbar, { static: false })
  private searchbar!: IonSearchbar;

  @ViewChild(IonInfiniteScroll)
  private infiniteScroll!: IonInfiniteScroll;

  public searching: boolean = false;
  public searchClient: SearchClient = algoliaSearch(
    '8NDQ1FNIDU',
    '45b11751dc7e276f781a85f719abda66'
  );
  public index: SearchIndex = this.searchClient.initIndex('lists');

  constructor(
    private store: Store,
    private menu: MenuController,
    private popover: PopoverController,
    private translate: TranslateService,
    private alert: AlertController
  ) {
    super();
  }

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public delete(event: Event): void {
    this.translate
      .get([
        Translation.AlertConfirmDeleteHeader,
        Translation.AlertConfirmDeleteMessage,
        Translation.AlertConfirmDeleteCancel,
        Translation.AlertConfirmDeleteConfirm,
        Translation.AlertConfirmDeleteEvent
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.alert.create({
            cssClass: 'cpt-alert',
            header: `${translations[Translation.AlertConfirmDeleteHeader]} ${
              translations[Translation.AlertConfirmDeleteEvent]
            }?`,
            message: translations[Translation.AlertConfirmDeleteMessage],

            buttons: [
              {
                text: translations[Translation.AlertConfirmDeleteCancel],
                role: 'cancel'
              },
              {
                text: translations[Translation.AlertConfirmDeleteConfirm],
                handler: () =>
                  this.store.dispatch(new ActionUserEventsDelete(event.id))
              }
            ]
          })
        ),
        switchMap((alert: HTMLIonAlertElement) => from(alert.present()))
      )
      .subscribe();
  }

  public navigate(object: Alert | Event): void {
    const page: Pages = !object.hasOwnProperty('read')
      ? Pages.EventDetail
      : Pages.NotificationDetail;

    this.store.dispatch(
      new Navigate([Pages.Tabs, Pages.Calendar, page, object.id])
    );
  }

  public add(): void {
    this.store.dispatch([
      new ActionListReset(),
      new Navigate([
        Pages.Tabs,
        Pages.Calendar,
        Pages.EventDetail,
        CoreEnum.IdNew
      ])
    ]);
  }

  public resetSearchResults() {
    this.store.dispatch(new ActionSearchReset()).subscribe();
  }

  public selectSearchList(list: List) {
    this.store
      .dispatch(new ActionSearchReset())
      .pipe(
        switchMap(() => this.store.dispatch(new ActionListGet(list.id))),
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
    // const isStream: boolean = this.store.selectSnapshot(StateMobile.pageStream);

    const popover: HTMLIonPopoverElement = await this.popover.create({
      component: ComponentHomeOptions,
      componentProps: {
        listType: this.store.selectSnapshot(StateLists.type),
        eventType: this.store.selectSnapshot(StateCalendar.type),
        isStream: false,
        virtual: this.store.selectSnapshot(StateCalendar.virtual)
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

    this.store.dispatch(new ActionSearchEvents(event.detail.value));
  }

  public loadData(): void {
    this.store.dispatch(new ActionCalendarPage(this.infiniteScroll));
  }
}
