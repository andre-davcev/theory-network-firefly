import {OnDestroy}    from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

export class AppComponent implements OnDestroy
{
    private _subscriptions: Array<Subscription> = [];

    constructor()
    {

    }

    ngOnDestroy()
    {
        for (const subscription of this._subscriptions)
        {
            subscription.unsubscribe();
        }
    }

    public subscriptionsAdd(...subscriptions: Array<Subscription>)
    {
        this._subscriptions.concat(subscriptions);
    }
}