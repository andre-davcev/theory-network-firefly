import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateSubscriptions, Subscription, Stream, StateUser } from '@firefly/core';

@Component
({
    selector    : 'app-page-stream',
    templateUrl : 'stream.page.html',
    styleUrls   : ['./stream.page.scss']
})

export class PageStream
{
    @Select(StateSubscriptions.subscriptions) subscriptions$: Observable<Array<Subscription>>;
    @Select(StateUser.stream) stream$: Observable<Array<Stream>>;

    constructor(private store: Store)
    {
;
    }

    public ionViewWillEnter(): void
    {
        //this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public subscribe(subscription: Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}
