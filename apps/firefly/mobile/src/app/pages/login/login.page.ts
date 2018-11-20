import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';

import { StateUser, ActionUserAuthenticate, ActionLoginEmail } from '@firefly/core';
import { StatusBar } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-login',
    templateUrl : 'login.page.html',
    styleUrls   : ['./login.page.scss']
})

export class PageLogin implements OnInit
{
    @Select(StateUser.authenticated)          userAuthenticated$: Observable<boolean>;
    @Select(StateUser.loading)                userLoading$:       Observable<boolean>;
    @Select(StateUser.userFound)              userFound$:         Observable<boolean>;
    @Select(StateUser.loadedNotAuthenticated) loadedNotAuthenticated$: Observable<boolean>;

    constructor(private store: Store, private router: Router, private nav: NavController) { }

    public ngOnInit(): void
    {
        this.login();
        this.userFound$.
        pipe(filter((userFound: boolean) => userFound), take(1)).
        subscribe(() => this.nav.navigateRoot('/home'))

        this.store.dispatch(new ActionUserAuthenticate());
    }

    public ionViewWillEnter(): void
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    login()
    {
        this.store.dispatch(new ActionLoginEmail({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
    }

    create()
    {
//        this.store.dispatch(new UserCreate({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
    }
}
