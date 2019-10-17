import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionClusterSetId } from '@firefly/core';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetCluster implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        return this.store.dispatch(new ActionClusterSetId(route.params.id));
    }
}
