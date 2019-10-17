import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import { ActionUserAlertsGetData, ActionUserStreamGetData, StateUserAlerts, StateUserStream } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageHome implements Resolve<void>
{

    @Select(StateUserAlerts.initialized) alerts$: Observable<boolean>;
    @Select(StateUserStream.initialized) stream$: Observable<boolean>;

    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        return combineLatest([this.alerts$, this.stream$]).
        pipe
        (
            take(1),
            map(([alerts, stream]) => alerts && stream),
            switchMap((initialized: boolean) =>
                initialized ?
                    of(null) :
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => this.store.dispatch
                        ([
                            new ActionUserAlertsGetData(),
                            new ActionUserStreamGetData()
                        ])),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
                    )
            )
        )
    }
}
