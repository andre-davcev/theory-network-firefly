import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateUser } from '@firefly/core';
import { filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverPageHome implements Resolve<boolean>
{
    @Select(StateUser.loading) loading$: Observable<boolean>;

    constructor() {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
        return this.loading$.
        pipe
        (
            filter((loading: boolean) => !loading),
            take(1)
        );
    }
}
