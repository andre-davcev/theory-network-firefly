import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionEventSetIdAnonymous } from '@firefly/core';

@Injectable({ providedIn: 'root' })
export class ResolverPageNotificationDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        this.store.dispatch(new ActionEventSetIdAnonymous(route.params.id))
    }
}
