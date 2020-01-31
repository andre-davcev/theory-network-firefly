import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { Credentials } from '@theory/core';
import { Store } from '@ngxs/store';
import { ActionUserLoginEmail, ActionUserCreate } from '@firefly/core/state';
import { switchMap, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';

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

    public faEnvelope: IconDefinition = faEnvelope;
    public faLock:     IconDefinition = faLock;

    public form: FormGroup;

    constructor
    (
        private formBuilder : FormBuilder,
        private store       : Store,
        private modal       : ModalController
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

    public clicked(): void
    {
        const credentials: Credentials = this.form.value;

        console.log(credentials);

        const action: ActionUserLoginEmail | ActionUserCreate = this.login ?
            new ActionUserLoginEmail(credentials) :
            new ActionUserCreate(credentials);

        this.authenticating = true;

        this.store.dispatch(action).
        pipe
        (
            switchMap(() =>
                from(this.modal.dismiss())
            ),
            tap(() =>
                this.authenticating = false
            )
        ).
        subscribe();
    }
}
