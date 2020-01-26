import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavController, ModalController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';

import { AuthProvider } from '@theory/firebase';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { StateUser, ActionUserLoginEmail, ActionUserCreate } from '@firefly/core';
import { ActionDeviceStatusBarSet, ActionDeviceStatusBarShow } from '@theory/capacitor';
import { Credentials } from '@theory/core';

@Component
({
    selector    : 'app-page-login',
    templateUrl : 'login.page.html',
    styleUrls   : ['./login.page.scss']
})

export class PageLogin implements OnInit
{
    @Select(StateUser.authenticated)          userAuthenticated$:      Observable<boolean>;
    @Select(StateUser.loading)                userLoading$:            Observable<boolean>;
    @Select(StateUser.found())                userFound$:              Observable<boolean>;
    @Select(StateUser.loadedNotAuthenticated) loadedNotAuthenticated$: Observable<boolean>;
    @Select(StateUser.error)                  error$:                  Observable<Error>;

    @Input() signup: boolean = false;

    public AuthProvider: any = AuthProvider;
    public task: String;
    public loginForm: FormGroup;

    public error_messages: any =
    {
        email: [
          { type: 'required', message: 'Email is required'},
          { type: 'minlength', message: 'Email length must be longer or equal than 6 characters'},
          { type: 'maxlength', message: 'Email length must be lower or equal to 50 characters'},
          { type: 'pattern', message: 'Please enter a valid email address'}
        ],
        password: [
          { type: 'required', message: 'Password is required'},
          { type: 'minlength', message: 'Password length must be longer or equal than 6 characters'},
          { type: 'maxlength', message: 'Password length must be lower or equal to 50 characters'},
        // { type: 'pattern', message: 'Password must contain numbers, uppercase and lowercase characters'}
        ]
    }

    constructor
    (
        private store       : Store,
        private nav         : NavController,
        private formBuilder : FormBuilder,
        private modal       : ModalController
    )
    {
        this.loginForm = this.formBuilder.group
        ({
            password: new FormControl('', Validators.compose
            ([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
                //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$')
            ])),
            email: new FormControl('', Validators.compose
            ([
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
/*
        this.userFound$.
        pipe
        (
            filter((userFound: boolean) => userFound),
            take(1),
            switchMap(() =>
                this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home))
            )
        ).
        subscribe();
*/
        this.store.dispatch([new ActionDeviceStatusBarShow()]);
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public login(): void
    {
        console.log('user: ' + this.loginForm.value.email);
        console.log('password: ' + this.loginForm.value.password);

        this.store.dispatch(new ActionUserLoginEmail(this.credentials())).
        pipe
        (
            switchMap(() =>
                from(this.modal.dismiss())
            )
        ).
        subscribe();
    }

    public createUser(): void
    {
        this.store.dispatch(new ActionUserCreate(this.credentials())).
        pipe
        (
            switchMap(() =>
                from(this.modal.dismiss())
            )
        ).
        subscribe();
    }

    public close(): void
    {
        this.modal.dismiss();
    }

    private credentials(): Credentials
    {
        const credentials: Credentials =
        {
            id:       this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        return credentials;
    }
}
