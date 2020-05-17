import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { Credentials } from '@theory/core';
import { Store } from '@ngxs/store';
import { ActionUserLoginEmail, ActionUserCreate, ActionUserResetPassword } from '@firefly/core/state';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component
({
    selector        : 'app-auth',
    templateUrl     : './auth.component.html',
    styleUrls       : ['./auth.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentAuth
{
    @Input()
    public authenticating: boolean = false;

    @Input()
    public login: boolean = true;

    @Input()
    public resetPassword: boolean = false;

    @Output()
    public finished: EventEmitter<boolean> = new EventEmitter();

    public faEnvelope: IconDefinition = faEnvelope;
    public faLock:     IconDefinition = faLock;

    public form: FormGroup;

    constructor
    (
        private formBuilder : FormBuilder,
        private store       : Store
    )
    {
        this.form = this.formBuilder.group
        ({
            password: new FormControl('', Validators.compose
            ([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
                //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$')
            ])),

            id: new FormControl('', Validators.compose
            ([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
    }

    ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
        let chng = changes[propName];
        if(propName === 'resetPassword')
        {
          if(chng.currentValue)
          {
            this.form = this.formBuilder.group
            ({
                password: new FormControl('', Validators.compose
                ([
                  Validators.minLength(0),
                  Validators.maxLength(30),
                ])),
                id: new FormControl('', Validators.compose
                ([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(50),
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ]))
            });
          }
        }
      }
    }

    public clicked(): void
    {
        const credentials: Credentials = this.form.value;

        console.log(credentials);

        const action: ActionUserLoginEmail | ActionUserCreate | ActionUserResetPassword = this.login ?
            new ActionUserLoginEmail(credentials) :
            this.resetPassword ? new ActionUserResetPassword(credentials) :
            new ActionUserCreate(credentials);

        this.authenticating = true;

        this.store.dispatch(action).
        pipe
        (
            tap(() =>
                this.authenticating = false
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
}
