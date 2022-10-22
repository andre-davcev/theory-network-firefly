import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ResolverPageHome implements Resolve<boolean>
{
    constructor() {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
       return of(true);
    }
}
