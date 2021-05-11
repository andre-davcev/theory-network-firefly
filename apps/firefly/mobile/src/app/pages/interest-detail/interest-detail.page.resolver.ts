import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionInterestSetId, ActionInterestEventsReset, ActionInterestSetIdAnonymous, ActionInterestEventsGetAnonymous, InterestType, ActionAppLoadingHide, StateInterests } from '@firefly/core';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverPageInterestDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        const interestType = this.store.selectSnapshot(StateInterests.type);

        if(route.queryParams.id == null)
        {
          return this.store.dispatch([
            new ActionInterestEventsReset()
          ]).pipe(
            switchMap(() => this.store.dispatch([
                new ActionInterestSetId(route.queryParams.id)/*,
                new ActionUserEventsGetData()*/
              ])),
              switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
          )
        }
        else if(interestType === InterestType.Created)
        {
          return this.store.dispatch(new ActionInterestSetId(route.queryParams.id)).
          pipe(
            switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous())),
            switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
          );
        }
        else{
          return this.store.dispatch(new ActionInterestSetIdAnonymous(route.queryParams.id)).
          pipe(
            switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous())),
            switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
          );
        }   

    }
}
