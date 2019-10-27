import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';

import { AuthProvider } from '@theory/firebase';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { StateUser, ActionUserLoginEmail, ActionUserLogout, ActionUserCreate } from '@firefly/core';
import { ActionDeviceStatusBarSet, ActionDeviceStatusBarShow } from '@theory/capacitor';

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
    @Select(StateUser.found)                  userFound$:              Observable<boolean>;
    @Select(StateUser.loadedNotAuthenticated) loadedNotAuthenticated$: Observable<boolean>;
    @Select(StateUser.error) error$: Observable<String>;

    public AuthProvider: any = AuthProvider;
    public showCreate: boolean = false;
    public task: String;
    public loginForm: FormGroup;

    error_messages = {
      'email': [
        { type: 'required', message: 'Email is required'},
        { type: 'minlength', message: 'Email length must be longer or equal than 6 characters'},
        { type: 'maxlength', message: 'Email length must be lower or equal to 50 characters'},
        { type: 'pattern', message: 'Please enter a valid email address'}
      ],
      'password': [
        { type: 'required', message: 'Password is required'},
        { type: 'minlength', message: 'Password length must be longer or equal than 6 characters'},
        { type: 'maxlength', message: 'Password length must be lower or equal to 50 characters'},
        { type: 'pattern', message: 'Password must contain numbers, uppercase and lowercase characters'}
      ]
    }

    constructor(private store: Store, private nav: NavController,
      public formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
          password: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$')
          ])),
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ]))
        });
       }

    public ngOnInit(): void
    {
        //this.logout();
        /*this.login();*/
        this.userFound$.
        pipe
        (
            tap(found => console.log(found)),
            filter((userFound: boolean) => userFound),
            take(1)
        ).
        subscribe(() => this.nav.navigateRoot('/home'))

        this.store.dispatch([new ActionDeviceStatusBarShow()]);
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    login()
    {
        console.log('user: ' + this.loginForm.value.email);
        console.log('password: ' + this.loginForm.value.password);
        this.store.dispatch(new ActionLoginEmail({id: this.loginForm.value.email, password: this.loginForm.value.password}));
    }

    logout()
    {
      this.store.dispatch(new ActionUserLogout());
    }

    createUser()
    {
        this.store.dispatch(new ActionUserCreate({id: this.loginForm.value.email, password: this.loginForm.value.password}));
    }

    showCreateButton()
    {
      this.showCreate = !this.showCreate;
    }
}
