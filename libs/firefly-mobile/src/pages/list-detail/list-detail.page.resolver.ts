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
  ActionListEventsGetAnonymous,
  ActionListEventsGetPending,
  ActionListSetId,
  StateList
} from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageListDetail implements Resolve<void> {
  constructor(private store: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    return this.store
      .dispatch(new ActionListSetId(route.queryParams['id']))
      .pipe(
        switchMap(() =>
          route.queryParams['id'] == null
            ? of(null)
            : this.store.selectSnapshot(StateList.canEdit)
            ? this.store.dispatch([
                new ActionListEventsGetPending(),
                new ActionListEventsGetAnonymous()
              ])
            : this.store.dispatch(new ActionListEventsGetAnonymous())
        ),
        switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
      );
  }
}
