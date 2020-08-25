import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResolverPageCalendar implements Resolve<void>
{
    constructor(private store: Store) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void>
    {
        return of(null);
    }
}
