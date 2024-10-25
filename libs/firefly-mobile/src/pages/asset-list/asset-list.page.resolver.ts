import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ActionAppLoadingHide,
  ActionListEventsGet,
  ActionListSetId
} from '@firefly/shared';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetList implements Resolve<void> {
  constructor(private store: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    if (route.params['id'] == null) {
      return this.store
        .dispatch(new ActionListSetId(route.queryParams['id']))
        .pipe(switchMap(() => this.store.dispatch(new ActionAppLoadingHide())));
    } else {
      return this.store.dispatch([
        new ActionListEventsGet(),
        new ActionAppLoadingHide()
      ]);
    }
  }
}
