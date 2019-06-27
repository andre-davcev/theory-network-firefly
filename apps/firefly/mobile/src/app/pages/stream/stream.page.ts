import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { Stream, StateUser, ActionUserSubscribe, ActionUserUnsubscribe, ClusterKey, Cluster } from '@firefly/core';

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
        if (subscribed)
        {
            this.store.dispatch(new ActionUserSubscribe(stream.id));
        }
        else
        {
            this.store.dispatch(new ActionUserUnsubscribe(stream.id));
        }
    }
}
