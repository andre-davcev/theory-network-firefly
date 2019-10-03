import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ActionIconSetId } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetIcon implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        return this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionIconSetId(route.params.id)
        ]).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
        );
    }
}
