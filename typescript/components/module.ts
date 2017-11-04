import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from 'ionic-angular';

export {TNComponentOptions} from './component.options';
export {TNComponent}        from './component';

export {TNIcon}          from './icon/icon';
export {TNDirective}     from './input/directive';
export {TNInput}         from './input/input';
export {TNInputEmail}    from './input/input.email';
export {TNInputPassword} from './input/input.password';
export {TNInputText}     from './input/input.text';

export {TNRatingPopoverPage} from './rating/rating.popover';
export {TNRating}            from './rating/rating';

import {TNInputEmail}    from './input/input.email';
import {TNInputPassword} from './input/input.password';
import {TNInputText}     from './input/input.text';

import {TNRatingPopoverPage} from './rating/rating.popover';
import {TNRating}            from './rating/rating';

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
        TNInputText,

        TNRatingPopoverPage,
        TNRating
    ],

    exports :
    [
        TNInputEmail,
        TNInputPassword,
        TNInputText,

        TNRatingPopoverPage,
        TNRating
    ],

    entryComponents : [TNRatingPopoverPage]
})

export class TNComponentModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TNComponentModule,
            providers : []
        }
    }
}