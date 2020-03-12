import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { ActionInterestSetId, ActionUserIconsReset, ActionInterestEventsGet, ActionInterestEventsReset } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetInterest implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {

        if(route.queryParams.id == null)
        {
          return this.store.dispatch([
            new ActionUserIconsReset(),
            new ActionInterestEventsReset()
          ]).pipe(
            switchMap(() => this.store.dispatch([
                new ActionInterestSetId(route.queryParams.id)/*,
                new ActionUserEventsGetData()*/
              ])),
              switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
          )
        }
        else{
          return this.store.dispatch(new ActionInterestSetId(route.queryParams.id)).
          pipe(
            switchMap(() => this.store.dispatch(new ActionInterestEventsGet())),
            switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
          );
        }   

    }
}
