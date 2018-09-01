import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin, timer, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { StateUser } from '../../state/user/user.state';
import { UserAuthenticate, LoginFacebook, LoginGoogle, LoginEmail } from '../../state/user/user.actions';
import { AuthProvider } from '../../enums/auth-provider.enum';


@Component
({
    selector    : 'app-page-auth',
    templateUrl : 'auth.page.html',
    styleUrls   : ['./auth.page.scss']
})

export class PageLogin
{
    public AuthProvider: any = AuthProvider;

    @Select(StateUser.authenticated) userAuthenticated$: Observable<boolean>;
    @Select(StateUser.userFound)     userFound$:         Observable<boolean>;

    public ready: boolean = false;

    constructor(private nav: NavController, private store: Store, private router: Router)
    {

    }

    public ionViewDidLoad()
    {
        this.userFound$.pipe
        (
            filter((userFound: boolean) => userFound),
            take(1)
        ).

        subscribe((userFound: boolean) =>
        {
            this.router.navigate(['/notifications']);
        });

        forkJoin
        (
            timer(1875),

            this.store.dispatch(new UserAuthenticate()).pipe
            (
                switchMap(() => this.userAuthenticated$),

                switchMap((authenticated: boolean) => authenticated ? this.userFound$.pipe(filter((found: boolean) => found)) : of(authenticated)),

                take(1)
            )
        ).

        subscribe(() => this.ready = true);
    }

    login(provider: AuthProvider)
    {
        if (provider === AuthProvider.Facebook)
        {
            this.store.dispatch(new LoginFacebook());
        }
        else if (provider === AuthProvider.Google)
        {
            this.store.dispatch(new LoginGoogle());
        }
        else if (provider === AuthProvider.Email)
        {
            this.store.dispatch(new LoginEmail({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
        }
    }

    create()
    {
//        this.store.dispatch(new UserCreate({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
    }
}
