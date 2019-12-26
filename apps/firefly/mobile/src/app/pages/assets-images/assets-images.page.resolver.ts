import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ActionUserImagesGetData, StateUserImages } from '@firefly/core';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetsImages implements Resolve<void>
{
    @Select(StateUserImages.initialized()) icons$: Observable<boolean>;

    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this.store.dispatch(new ActionUserImagesGetData())
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
