import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from 'ionic-angular';

import {TNInputEmail}    from './email/email';
import {TNInputPassword} from './password/password';
import {TNInputText}     from './text/text';

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
        TNInputEmail,
        TNInputPassword,
        TNInputText
    ],

    exports :
    [
        TNInputEmail,
        TNInputPassword,
        TNInputText
    ]
})

export class TNModuleInput
{

}