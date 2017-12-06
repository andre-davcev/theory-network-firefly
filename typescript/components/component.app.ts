import {OnDestroy}    from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

export class AppComponent implements OnDestroy
{
    private subscriptions: Array<Subscription> = [];

    constructor()
    {

    }

    ngOnDestroy()
    {
        for (const subscription of this.subscriptions)
        {
            subscription.unsubscribe();
        }
    }

    public subscriptionsAdd(subscription: Subscription) : number
    {
        this.subscriptions.push(subscription);

        return this.subscriptions.length - 1;
    }
}