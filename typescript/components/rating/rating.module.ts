import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from 'ionic-angular';

import {TNRatingPopoverPage} from './rating.popover';
import {TNRating}            from './rating';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule
    ],

    declarations :
    [
        TNRatingPopoverPage,
        TNRating
    ],

    exports :
    [
        TNRatingPopoverPage,
        TNRating
    ]
})

export class TNModuleRating
{

}