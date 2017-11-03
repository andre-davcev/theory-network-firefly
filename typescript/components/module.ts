import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNComponentOptions} from './component.options';
export {TNComponent}        from './component';

export {TNIcon} from './icon/icon';

export {TNDirective} from './input/directive';
export {TNInput}     from './input/input';

import {TNInputEmail}    from './input/input.email';
import {TNInputPassword} from './input/input.password';
import {TNInputText}     from './input/input.text';

import {TNRatingPopoverPage} from './rating/rating.popover';
import {TNRating}            from './rating/rating';

@NgModule
({
    imports : [],

    declarations :
    [
        TNInputEmail,
        TNInputPassword,
        TNInputText,

        TNRatingPopoverPage,
        TNRating
    ],

    exports : [],

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