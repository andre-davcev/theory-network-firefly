import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ActionAppLoadingHide, ActionAppLoadingShow, ActionUserProfileSetId, StateUserProfile } from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageUserProfile implements Resolve<void>
{
    @Select(StateUserProfile.found()) initialized$: Observable<boolean>;

    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this.initialized$.
        pipe
        (
            take(1),
            switchMap((initialized: boolean) =>
                initialized ?
                    of(null) :
                    this.store.dispatch(new ActionAppLoadingShow()).
                    pipe
                    (
                        switchMap(() => this.store.dispatch(new ActionUserProfileSetId())),
                        switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
                    )
            )
        );
    }
}
