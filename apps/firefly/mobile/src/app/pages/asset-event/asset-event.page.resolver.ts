import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { ActionEventGet } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverPageAssetEvent implements Resolve<any>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionEventGet(route.params.id)
        ]).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionMobileLoadingHide()))
        );
    }
}
