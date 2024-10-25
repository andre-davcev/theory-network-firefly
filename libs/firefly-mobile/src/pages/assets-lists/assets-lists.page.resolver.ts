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
  ActionUserListsGetData,
  StateUserLists
} from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetsLists implements Resolve<void> {
  @Select(StateUserLists.initialized()) initialized$!: Observable<boolean>;

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
                this.store.dispatch(new ActionUserListsGetData())
              ),
              //switchMap(() => this.store.dispatch(new ActionUserIconsGetData())),
              switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
            )
      )
    );
  }
}
