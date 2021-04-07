import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionInterestSetId, ActionInterestEventsGet, ActionInterestEventsReset, ActionAppLoadingHide } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetInterest implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        if (route.params.id == null)
        {
            return this.store.dispatch([new ActionInterestEventsReset()]).
            pipe
            (
                switchMap(() =>
                    this.store.dispatch
                    ([
                        new ActionInterestSetId(route.queryParams.id),
                        // new ActionUserEventsGetData()
                    ])
                ),
                switchMap(() =>
                    this.store.dispatch(new ActionAppLoadingHide())
                )
            )
        }
        else
        {
          return this.store.dispatch
          ([
              new ActionInterestEventsGet(),
              new ActionMobileLoadingHide()
          ]);
        }   
    }
}
