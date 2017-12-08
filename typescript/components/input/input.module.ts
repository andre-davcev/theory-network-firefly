import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from 'ionic-angular';

import {InputEmail}    from './email/email';
import {InputPassword} from './password/password';
import {InputText}     from './text/text';

@NgModule
({
    imports :
    [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],

    declarations :
    [
        InputEmail,
        InputPassword,
        InputText
    ],

    exports :
    [
        InputEmail,
        InputPassword,
        InputText
    ]
})

export class ModuleInput
{

}