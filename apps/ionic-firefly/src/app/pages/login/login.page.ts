import { Component, OnInit, HostBinding } from '@angular/core';
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
    selector    : 'app-page-login',
    templateUrl : 'login.page.html',
    styleUrls   : ['./login.page.scss']
})

export class PageLogin implements OnInit
{
    public AuthProvider: any = AuthProvider;

    @Select(StateUser.authenticated)  userAuthenticated$:  Observable<boolean>;
    @Select(StateUser.authenticating) userAuthenticating$: Observable<boolean>;
    @Select(StateUser.userFound)      userFound$:          Observable<boolean>;

    constructor(private store: Store) { }

    public ngOnInit(): void
    {
        this.userFound$.pipe
        (
            filter((userFound: boolean) => userFound),
            take(1)
        ).

        subscribe((userFound: boolean) =>
        {
//            this.router.navigate(['/home']);
        });

        this.store.dispatch(new UserAuthenticate());
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
