import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide } from '@firefly/mobile';
import { ActionEventSetId, ActionEventImageSet } from '@firefly/core';

@Injectable({ providedIn: 'root' })
export class ResolverPageEventDetail implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
      console.log('in resolver');
      return this.store.dispatch(new ActionMobileLoadingHide()).pipe(
        switchMap(() => this.store.dispatch(new ActionEventImageSet()))
      )
    }
}
