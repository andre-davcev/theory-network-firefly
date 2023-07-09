import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionUserInterestsGetData,
  StateUserInterests
} from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetsInterests implements Resolve<void> {
  @Select(StateUserInterests.initialized()) initialized$: Observable<boolean>;

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
                this.store.dispatch(new ActionUserInterestsGetData())
              ),
              //switchMap(() => this.store.dispatch(new ActionUserIconsGetData())),
              switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
            )
      )
    );
  }
}
