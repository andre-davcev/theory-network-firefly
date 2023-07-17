import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionEventSetId } from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageEventDetail implements Resolve<void> {
  constructor(private store: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    return this.store.dispatch(new ActionEventSetId(route.params.id));
  }
}
