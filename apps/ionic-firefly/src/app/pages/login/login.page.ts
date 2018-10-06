import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { StateUser } from '../../state/user/user.state';
import { UserAuthenticate, LoginEmail } from '../../state/user/user.actions';
import { Page } from '../../classes/page.class';

@Component
({
    selector    : 'app-page-login',
    templateUrl : 'login.page.html',
    styleUrls   : ['./login.page.scss']
})

export class PageLogin extends Page implements OnInit
{
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

    login()
    {
        this.store.dispatch(new LoginEmail({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
    }

    create()
    {
//        this.store.dispatch(new UserCreate({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
    }
}
