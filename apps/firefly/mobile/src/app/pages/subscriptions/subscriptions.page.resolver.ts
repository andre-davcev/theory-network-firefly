import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { StateUserSubscriptions, ActionUserWatchSubscriptionsStatus, StateUser, ActionUserSubscriptionsSetData } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { SubscriptionPartial } from '../../../../../cloud/src/library/models';

@Injectable({ providedIn: 'root' })
export class ResolverPageSubscriptions implements Resolve<void>
{
    @Select(StateUserSubscriptions.initialized()) initialized$: Observable<boolean>;

    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        const subscriptions: Record<string, SubscriptionPartial> = this.store.selectSnapshot(StateUser.subscriptionsStatus);

        return this.initialized$.
        pipe
        (
            take(1),
            switchMap((initialized: boolean) =>
                initialized ?
                    of(null) :
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => this.store.dispatch(new ActionUserSubscriptionsSetData(subscriptions, true))),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
                    )
            )
        )
    }
}
