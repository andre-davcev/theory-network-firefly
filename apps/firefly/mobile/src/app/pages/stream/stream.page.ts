import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateUserStream, StateUser, ActionUserSubscriptionToggle } from '@firefly/core';
import { StreamInterest } from '@firefly/cloud';
import { StateStorage, StorageImage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { takeUntil, take, switchMap } from 'rxjs/operators';
import { ActionMobileAuthSelect } from '@firefly/mobile';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream extends BaseComponent implements OnInit
{
    @Select(StateUser.stream)        stream$:        Observable<Array<StreamInterest>>;
    @Select(StateStorage.images)     images$:        Observable<Record<string, StorageImage>>;
    @Select(StateUser.authenticated) authenticated$: Observable<boolean>;

    public images: Record<string, StorageImage>;
    public currentlyOpenedItemIndex = -1;
    public currentlyOpenedItems = [];

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
                    this.store.dispatch(new ActionUserSubscriptionToggle(stream.id, false)) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
    }

    public setOpened(itemIndex): void
    {
        this.currentlyOpenedItemIndex = itemIndex;
        this.currentlyOpenedItems[itemIndex] = true;
    }

    public setClosed(itemIndex): void
    {
        if(this.currentlyOpenedItemIndex === itemIndex)
        {
            this.currentlyOpenedItemIndex = -1;
        }
    }
}
