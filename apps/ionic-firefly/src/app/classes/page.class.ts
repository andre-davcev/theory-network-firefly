import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class Page implements OnDestroy
{
    private subscriptions: Array<Subscription> = [];

    protected subscriptionsAdd(...subscriptions: Array<Subscription>): void
    {
        this.subscriptions.concat(subscriptions);
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
