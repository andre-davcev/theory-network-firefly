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

    public subscriptionsAdd(subscription: Subscription) : number
    {
        this._subscriptions.push(subscription);

        return this._subscriptions.length - 1;
    }
}