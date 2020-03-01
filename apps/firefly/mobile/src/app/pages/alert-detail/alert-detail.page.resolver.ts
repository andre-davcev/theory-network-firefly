import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionEventSetId, ActionAlertSetId } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageAlertDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
      return this.store.dispatch(new ActionAlertSetId(route.params.id)).pipe(
        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
      )
    }
}
