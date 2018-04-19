import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Platform}      from 'ionic-angular';
import {IonicPage}     from 'ionic-angular';

import {Observable} from 'rxjs/Observable';
import {Observer}   from 'rxjs/Observer';
import {filter, switchMap, take, tap} from 'rxjs/operators';

import {ComponentApp} from '@theory/core/classes';

import {PageTabs} from '../tabs/tabs';
import {User}     from '../../models/user';

import {AuthProvider}  from '../../enums/auth.provider';
import {Email}         from '../../models/email';
import {Password}      from '../../models/password';

import { timer } from 'rxjs/observable/timer';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { Store, Select } from '@ngxs/store';
import { UserAuthenticate, LoginFacebook, LoginGoogle, LoginEmail, UserCreate, StateUser } from '../../ngxs/user.state';

@IonicPage()
@Component
({
    selector    : 'app-page-auth',
    templateUrl : 'auth.html'
})

export class PageLogin extends ComponentApp
{
    public AuthProvider: any = AuthProvider;

    @Select(StateUser.authenticated) userAuthenticated$: Observable<boolean>;
    @Select(StateUser.userFound)     userFound$:         Observable<boolean>;

    public ready: boolean = false;

    constructor(private nav:NavController, private platform:Platform, private store: Store)
    {
        super();
    }

    public ionViewDidLoad()
    {
        this.subscriptionsAdd
        (
            this.userFound$.pipe
            (
                filter((userFound: boolean) => userFound),
                take(1)
            ).

            subscribe((userFound: boolean) =>
            {
                this.nav.push('PageTabs');
            }),

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

            subscribe(() => this.ready = true)
        );
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
