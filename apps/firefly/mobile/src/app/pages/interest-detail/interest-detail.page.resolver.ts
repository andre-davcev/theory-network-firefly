import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionInterestSetId, ActionInterestEventsReset, ActionInterestSetIdAnonymous, ActionInterestEventsGetAnonymous, InterestType, StateApp } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageInterestDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        const interestType = this.store.selectSnapshot(StateApp.interestType);

        if(route.queryParams.id == null)
        {
          return this.store.dispatch([
            new ActionInterestEventsReset()
          ]).pipe(
            switchMap(() => this.store.dispatch([
                new ActionInterestSetId(route.queryParams.id)/*,
                new ActionUserEventsGetData()*/
              ])),
              switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
          )
        }
        else if(interestType === InterestType.Created)
        {
          return this.store.dispatch(new ActionInterestSetId(route.queryParams.id)).
          pipe(
            switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous())),
            switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
          );
        }
        else{
          return this.store.dispatch(new ActionInterestSetIdAnonymous(route.queryParams.id)).
          pipe(
            switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous())),
            switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
          );
        }   

    }
}
