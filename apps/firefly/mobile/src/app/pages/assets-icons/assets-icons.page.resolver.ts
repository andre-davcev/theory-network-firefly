import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { StateUserIcons, ActionUserIconsGetData } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetsIcons implements Resolve<void>
{
    @Select(StateUserIcons.initialized()) icons$: Observable<boolean>;

    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this.store.dispatch(new ActionUserIconsGetData())
        /*return this.icons$.
        pipe
        (
            take(1),
            switchMap((initialized: boolean) =>
                initialized ?
                    of(null) :
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => this.store.dispatch(new ActionUserIconsGetData())),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
                    )
            )
        )*/
    }
}
