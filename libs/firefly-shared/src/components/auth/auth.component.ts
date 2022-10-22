import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { Credentials, Regex } from '@theory/core';
import { Select, Store } from '@ngxs/store';
import { ActionUserLoginEmail, ActionUserCreate, ActionUserResetPassword, ActionUserSetErrorAuth, StateUser } from '@firefly/shared/state';
import { tap, catchError, filter, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { AuthError } from './auth-error.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthType } from './auth-type.enum';
import { AuthErrorId } from './auth-error-id.enum';
import { AuthErrorType } from './auth-error-type.enum';
import { AuthControl } from './auth-control.enum';
import { AuthErrorPassword } from './auth-error-password.enum';

@Component
({
    selector        : 'app-auth',
    templateUrl     : './auth.component.html',
    styleUrls       : ['./auth.component.scss']
})
export class ComponentAuth implements OnInit
{
    @Input()
    public authenticating: boolean = false;

    @Input()
    public type: AuthType = AuthType.Login;

    @Output()
    public finished: EventEmitter<boolean> = new EventEmitter();

    @Select(StateUser.errorAuthCode)
    private errorCode$: Observable<AuthErrorType>;

    public faEnvelope: IconDefinition = faEnvelope;
    public faLock:     IconDefinition = faLock;

    public form : FormGroup;

    public AuthType    : any = AuthType;
    public AuthControl : any = AuthControl;

    public focused: Record<string, BehaviorSubject<boolean>> =
    {
        [AuthControl.Id]       : new BehaviorSubject(false),
        [AuthControl.Password] : new BehaviorSubject(false)
    };

    public errorDefinitions: Record<AuthControl, Record<string, AuthError>> =
    {
        [AuthControl.Id]       : {},
        [AuthControl.Password] : {}
    };

    public errors$:    Record<string, Observable<Array<string>>> = {};
    public hasErrors$: Record<string, Observable<boolean>>       = {};

    private id: FormControl = new FormControl('', Validators.compose
    ([
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(Regex.Email)
    ]));

    private passwordLogin: FormControl = new FormControl('', Validators.compose
    ([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
    ]));

    private passwordSignUp: FormControl = new FormControl('', Validators.compose
    ([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(Regex.PasswordUpperLowerNumbers)
    ]));

    constructor
    (
        private formBuilder : FormBuilder,
        private store       : Store,
        private translate   : TranslateService
    )
    {
        this.store.dispatch(new ActionUserSetErrorAuth()).
        pipe
        this.translate.
            get
            ([
                ...Object.values(AuthErrorId).map((value: string) => `page.auth.errors.${AuthControl.Id}.${value}`),
                ...Object.values(AuthErrorPassword).map((value: string) => `page.auth.errors.${AuthControl.Password}.${value}`)
            ]).
            subscribe((translations: Record<string, string>) =>
                Object.
                    keys(translations).
                    forEach((id: AuthErrorId) =>
                    {
                        const parts   : Array<string> = id.split('.');
                        const control : AuthControl   = parts[3] as AuthControl;
                        const type    : AuthErrorType = parts[4] as AuthErrorType;

                        this.errorDefinitions[control][type] =
                        {
                            control,
                            id,
                            message: translations[id],
                            type
                        };
                    })
            );
    }

    public ngOnInit(): void
    {
        this.form = this.type === AuthType.Login ?
                this.formBuilder.group({ id: this.id, password: this.passwordLogin}) :
            this.type === AuthType.SignUp ?
                this.formBuilder.group({ id: this.id, password: this.passwordSignUp }) :
                this.formBuilder.group({ id: this.id});

        this.setErrorObservable(AuthControl.Id);

        if (this.type !== AuthType.ResetPassword)
        {
            this.setErrorObservable(AuthControl.Password);
        }
    }

    public clicked(): void
    {
        const credentials: Credentials = this.form.value;

        const action: ActionUserLoginEmail | ActionUserCreate | ActionUserResetPassword =
            this.type === AuthType.Login ?
                new ActionUserLoginEmail(credentials) :
            this.type === AuthType.ResetPassword ?
                new ActionUserResetPassword(credentials) :
                new ActionUserCreate(credentials);

        this.store.dispatch(action).
        pipe
        (
            filter(() =>
                !this.store.selectSnapshot(StateUser.erroredAuth)
            ),
            tap(() =>
                this.finished.emit(true)
            ),
            catchError(() =>
                of(this.finished.emit(false))
            )
        ).
        subscribe();
    }

    public focus(key: string, focused: boolean): void
    {
        this.focused[key].next(focused);

        this.store.dispatch(new ActionUserSetErrorAuth());
    }

    private setErrorObservable(control: AuthControl): void
    {
        this.errors$[control] =
        combineLatest
        ([
            this.errorCode$,
            this.focused[control],
            this.form.get(control).valueChanges
        ]).
        pipe
        (
            map(([errorCode, focused]) =>
                [
                    ...(
                          (!focused && this.form.get(control).errors != null)
                              ? Object.keys(this.form.get(control).errors) :
                              []
                    ),
                    ...(this.errorDefinitions[control][errorCode] == null ? [] : [errorCode])
                ]
            ),
            map((errors: Array<string>) =>
                errors.map((error: string) =>
                    this.errorDefinitions[control][error].message
                )
            )
        );

        this.hasErrors$[control] = this.errors$[control].
        pipe
        (
            map((errors: Array<string>) =>
                errors.length > 0
            )
        );
    }
}
