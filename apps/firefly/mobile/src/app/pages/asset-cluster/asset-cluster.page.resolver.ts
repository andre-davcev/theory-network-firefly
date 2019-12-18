import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { ActionClusterSetId, ActionUserIconsGetData, ActionUserIconsReset } from '@firefly/core';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetCluster implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {

        if(route.queryParams.id == null)
        {
          return this.store.dispatch(new ActionUserIconsReset).pipe(
            switchMap(() => this.store.dispatch(new ActionClusterSetId(route.queryParams.id)))
          )
        }
        else
          return this.store.dispatch(new ActionClusterSetId(route.queryParams.id))/*.
        pipe(
          switchMap(() => this.store.dispatch(new ActionUserIconsGetData()))
        );*/

    }
}
