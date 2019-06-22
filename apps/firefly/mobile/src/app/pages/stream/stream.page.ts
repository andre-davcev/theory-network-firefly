import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { Stream, StateUser, ActionUserSubscribe, ActionUserUnsubscribe, ClusterKey, Cluster } from '@firefly/core';
import { ModelKey } from '@theory/firebase';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream
{
    @Select(StateUser.stream) stream$: Observable<Array<Stream>>;

    constructor(private store: Store) { }

    public ionViewWillEnter(): void
    {
        //this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public toggle(subscribed: boolean, stream: Stream): void
    {
        stream.subscribed = subscribed;

        if (subscribed)
        {
            this.store.dispatch(new ActionUserSubscribe(stream[ModelKey.Id]));
        }
        else
        {
            this.store.dispatch(new ActionUserUnsubscribe(stream[ModelKey.Id]));
        }
    }

    public subscribers(cluster: Cluster): Observable<number>
    {
        return of(Object.keys(cluster[ClusterKey.Subscribers]).length);
    }
}
