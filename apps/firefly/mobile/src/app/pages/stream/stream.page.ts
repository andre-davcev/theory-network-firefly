import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateUser, ActionUserSubscriptionToggle, ActionInterestSetIdAnonymous, ActionInterestEventsGetAnonymous, StateInterest, IconType, StateUserStream, StateUserInterests } from '@firefly/core';
import { StreamInterest, Interest, Event } from '@firefly/cloud';
import { StateStorage, StorageImage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { takeUntil, take, switchMap, tap } from 'rxjs/operators';
import { ActionMobileAuthSelect, Pages, ActionMobileLoadingShow } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream extends BaseComponent implements OnInit
{
    @Select(StateStorage.images)            images$:        Observable<Record<string, StorageImage>>;
    @Select(StateUser.authenticated)        authenticated$: Observable<boolean>;
    @Select(StateInterest.events)           events$:        Observable<Event[]>;
    @Select(StateUserInterests.stream)      stream$:        Observable<Array<StreamInterest>>;
    @Select(StateUserInterests.streamFound) found$:         Observable<boolean>;

    public images: Record<string, StorageImage>;
    public currentlyOpenedItemIndex = -1;
    public currentlyOpenedItems = [];
    public interestEvents: Array<Array<Event>> = [];
    public spinner: Array<boolean> = [];

    public IconType: any = IconType;

    constructor(private store: Store) { super(); }

    public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    public toggle(subscribed: boolean, stream: StreamInterest): void
    {
        this.authenticated$.
        pipe
        (
            take(1),
            switchMap((authenticated: boolean) =>
                authenticated ?
                    this.store.dispatch(new ActionUserSubscriptionToggle(stream.id, true)) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
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

    public setClosed(itemIndex): void
    {
        if(this.currentlyOpenedItemIndex === itemIndex)
        {
            this.currentlyOpenedItemIndex = -1;
        }
    }

    public selectInterest(interest: Interest)
    {
      this.store.dispatch([
        new ActionMobileLoadingShow(),
        new Navigate([Pages.InterestDetail], {id: interest.id})
      ])
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
