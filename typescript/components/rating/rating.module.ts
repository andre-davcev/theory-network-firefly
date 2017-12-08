import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from 'ionic-angular';

import {RatingPopoverPage} from './rating.popover';
import {Rating}            from './rating';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule
    ],

    declarations :
    [
        RatingPopoverPage,
        Rating
    ],

    exports :
    [
        RatingPopoverPage,
        Rating
    ]
})

export class ModuleRating
{

}