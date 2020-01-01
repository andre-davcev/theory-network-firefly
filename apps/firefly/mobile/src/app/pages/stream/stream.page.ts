import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionUserSubscriptionsOn, ActionUserSubscriptionsOff, StateUserStream } from '@firefly/core';
import { StreamCluster } from '@firefly/cloud';
import { StateStorage, StorageImage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { takeUntil } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream extends BaseComponent implements OnInit
{
    @Select(StateUserStream.data()) stream$: Observable<Array<StreamCluster>>;
    @Select(StateStorage.images)    images$: Observable<Record<string, StorageImage>>;

    public images: Record<string, StorageImage>;

    constructor(private store: Store) { super(); }

    public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    public toggle(subscribed: boolean, stream: StreamCluster): void
    {
        if (subscribed)
        {
            this.store.dispatch(new ActionUserSubscriptionsOn(stream.id));
        }
        else
        {
            this.store.dispatch(new ActionUserSubscriptionsOff(stream.id));
        }
    }
}
