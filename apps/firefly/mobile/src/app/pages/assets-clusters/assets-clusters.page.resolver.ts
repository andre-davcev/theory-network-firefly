import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, empty } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ActionUserClustersGetData, StateUserClusters } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetsClusters implements Resolve<void>
{
    @Select(StateUserClusters.initialized) clusters$: Observable<boolean>;

    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this.clusters$.
        pipe
        (
            take(1),
            switchMap((initialized: boolean) =>
                initialized ?
                    empty() :
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => this.store.dispatch(new ActionUserClustersGetData())),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
                    )
            )
        )
    }
}
