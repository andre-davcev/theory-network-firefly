import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionUserEventsGetData,
  StateUserEvents
} from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetsEvents implements Resolve<void> {
  @Select(StateUserEvents.initialized()) initialized$: Observable<boolean>;

  constructor(private store: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.initialized$.pipe(
      take(1),
      switchMap((initialized: boolean) =>
        initialized
          ? of(null)
          : this.store.dispatch(new ActionAppLoadingShow()).pipe(
              switchMap(() =>
                this.store.dispatch(new ActionUserEventsGetData())
              ),
              switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
            )
      )
    );
  }
}
