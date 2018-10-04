import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { StateUser } from '../../state/user/user.state';
import { UserAuthenticate, LoginFacebook, LoginGoogle, LoginEmail } from '../../state/user/user.actions';
import { AuthProvider } from '../../enums/auth-provider.enum';
import { Page } from '../../classes/page.class';

@Component
({
    selector    : 'app-page-login',
    templateUrl : 'login.page.html',
    styleUrls   : ['./login.page.scss']
})

export class PageLogin extends Page implements OnInit
{
    public AuthProvider: any = AuthProvider;

    @Select(StateUser.authenticated)          userAuthenticated$: Observable<boolean>;
    @Select(StateUser.loading)                userLoading$:       Observable<boolean>;
    @Select(StateUser.userFound)              userFound$:         Observable<boolean>;
    @Select(StateUser.loadedNotAuthenticated) loadedNotAuthenticated$: Observable<boolean>;

    constructor(private store: Store, private router: Router, private nav: NavController)
    {
        super();
    }

    public ngOnInit(): void
    {
        this.subscriptionsAdd
        (
            this.userFound$.
            pipe(filter((userFound: boolean) => userFound), take(1)).
            subscribe(() => this.nav.navigateRoot('/home'))
        );

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
