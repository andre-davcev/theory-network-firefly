import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionEventSetId } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide } from '@firefly/mobile';
import { CoreEnum } from '@theory/core';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetEvent implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        if(route.queryParams.id == CoreEnum.IdNew)
        {
          return this.store.dispatch(new ActionEventSetId(route.params.id)).
          pipe
          (
              switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
          );
        }
        else{
          this.store.dispatch(new ActionMobileLoadingHide());
        }
    }
}
