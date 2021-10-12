import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateUser, ActionInterestSetIdAnonymous, ActionInterestEventsGetAnonymous, StateInterest, IconType, ActionInterestGet, ActionAppLoadingShow, ActionInterestsPage, StateInterests, ActionInterestsSubscriptionToggle, ActionInterestsSubscriptionOnOff } from '@firefly/core';
import { StreamInterest, Interest, Event, SubscriptionPartial } from '@firefly/cloud';
import { BaseComponent } from '@theory/core';
import { takeUntil, take, switchMap, tap } from 'rxjs/operators';
import { ActionMobileAuthSelect, Pages, StateSearch, ActionSearchReset } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { IonInfiniteScroll } from '@ionic/angular';
import { TimestampFormat } from '@theory/firebase';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream extends BaseComponent implements OnInit
{
    @Select(StateUser.authenticated)        authenticated$:      Observable<boolean>;
    @Select(StateInterest.events)           events$:             Observable<Event[]>;
    @Select(StateInterests.data)            data$:               Observable<Array<StreamInterest>>;
    @Select(StateInterests.found)           found$:              Observable<boolean>;
    @Select(StateInterests.empty)           empty$:              Observable<boolean>;
    @Select(StateInterests.add)             add$:                Observable<boolean>;
    @Select(StateUser.subscriptionsStatus)  subscriptions$:      Observable<Record<string, SubscriptionPartial>>;
    @Select(StateInterests.emptyMessage)    emptyMessage$:       Observable<string>;
    @Select(StateSearch.searchResults)      searchResults$:      Observable<Array<Interest>>;
    @Select(StateSearch.searchResultsFound) searchResultsFound$: Observable<boolean>;

    public currentlyOpenedItemIndex = -1;
    public currentlyOpenedItems = [];
    public interestEvents: Array<Array<Event>> = [];
    public spinner: Array<boolean> = [];
    public subscriptions: Record<string, SubscriptionPartial> = {};

    public IconType: any = IconType;
    public TimestampFormat: any = TimestampFormat;

    @ViewChild(IonInfiniteScroll)
    public infiniteScroll: IonInfiniteScroll;

    constructor(private store: Store) { super(); }

    public ngOnInit(): void
    {
        this.subscriptions$.
        pipe(takeUntil(this.destroy$)).
        subscribe((subscriptions: Record<string, SubscriptionPartial>) =>
            this.subscriptions = subscriptions
        )
    }


    public toggle(subscribed: boolean, stream: StreamInterest): void
    {
        this.authenticated$.
        pipe
        (
            take(1),
            switchMap((authenticated: boolean) =>
                authenticated ?
                    this.store.dispatch(new ActionInterestsSubscriptionToggle(stream.id, true)) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
    }

    public toggleOn(on: boolean, interest: StreamInterest): void
    {
        this.store.dispatch(new ActionInterestsSubscriptionOnOff(interest.id, on));
    }

    public setOpened(itemIndex, interest: Interest): void
    {
        this.currentlyOpenedItemIndex = itemIndex;
        this.currentlyOpenedItems[itemIndex] = true;
        this.spinner[itemIndex] = true;

        this.store.dispatch(new ActionInterestSetIdAnonymous(interest.id)).pipe
        (
          switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous())),
          tap(() => {
            const events = this.store.selectSnapshot(StateInterest.events);
            this.interestEvents[itemIndex] = events;
            this.spinner[itemIndex] = false
          })
        ).subscribe();
    }

    public setClosed(itemIndex: number): void
    {
        this.interestEvents[itemIndex] = null;
        if(this.currentlyOpenedItemIndex === itemIndex)
        {
            this.currentlyOpenedItemIndex = -1;
        }
    }

    public selectInterest(interest: Interest)
    {
      this.store.dispatch([
        new ActionAppLoadingShow(),
        new Navigate([Pages.InterestDetail], {id: interest.id})
      ])
    }

    public selectSearchInterest(interest: Interest)
    {
      this.store.dispatch(new ActionSearchReset()).pipe
      (
        switchMap(() =>
          this.store.dispatch(new ActionInterestGet(interest.id))),
        switchMap(() =>
          this.store.dispatch([
            new ActionAppLoadingShow(),
            new ActionSearchReset(),
            new Navigate([Pages.InterestDetail], {id: interest.id})
          ]))
      ).subscribe();
    }

    public resetSearchResults()
    {
      this.store.dispatch(new ActionSearchReset()).subscribe();
    }

    public add(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetInterest]));
    }

    public loadData(event: any): void
    {
        this.store.dispatch(new ActionInterestsPage(this.infiniteScroll));
    }

    public select(event: Event): void
    {

      this.store.dispatch(new Navigate([Pages.NotificationDetail, event.id], {isEvent: true})).subscribe();
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
