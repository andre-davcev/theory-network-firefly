import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionUserProfileSetId } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { ActionMobileLoadingHide, ActionMobileLoadingShow } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageUserProfile implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        return this.store.dispatch(new ActionMobileLoadingShow()).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionUserProfileSetId())),
            switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
        );
    }
}
