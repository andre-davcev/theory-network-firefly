import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { ActionInterestSetId, ActionInterestEventsGetAnonymous, ActionAppLoadingHide } from '@firefly/core';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverPageInterestDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        return this.store.dispatch(new ActionInterestSetId(route.queryParams.id)).
        pipe
        (
            switchMap(() =>
                route.queryParams.id == null ?
                    of(null) :
                    this.store.dispatch(new ActionInterestEventsGetAnonymous())
            ),
            switchMap(() =>
                this.store.dispatch(new ActionAppLoadingHide())
            )
        );
    }
}
