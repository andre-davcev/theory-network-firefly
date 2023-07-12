import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ActionAppLoadingHide,
  ActionInterestEventsGetAnonymous,
  ActionInterestEventsGetPending,
  ActionInterestSetId,
  StateInterest
} from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageInterestDetail implements Resolve<void> {
  constructor(private store: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    return this.store
      .dispatch(new ActionInterestSetId(route.queryParams.id))
      .pipe(
        switchMap(() =>
          route.queryParams.id == null
            ? of(null)
            : this.store.selectSnapshot(StateInterest.canEdit)
            ? this.store.dispatch([
                new ActionInterestEventsGetPending(),
                new ActionInterestEventsGetAnonymous()
              ])
            : this.store.dispatch(new ActionInterestEventsGetAnonymous())
        ),
        switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
      );
  }
}
