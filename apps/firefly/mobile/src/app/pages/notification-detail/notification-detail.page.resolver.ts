import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionEventSetId, ActionEventSetIdAnonymous } from '@firefly/core';

@Injectable({ providedIn: 'root' })
export class ResolverPageNotificationDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {

        if(route.queryParams.isEvent != null)
        {
          return this.store.dispatch(new ActionEventSetIdAnonymous(route.params.id));
        }
        else
        {
          return this.store.dispatch(new ActionEventSetId(route.params.id, true));
        }
    }
}
