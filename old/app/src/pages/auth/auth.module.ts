import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {ModuleInput}       from 'theory-network';
import {ModuleIconFirefly} from 'firefly-core';

import {PageLogin} from './auth';
import {FFIcon}    from '../../app/directives/icon/icon';

import {TranslateModule} from '@ngx-translate/core';


@NgModule
({
    imports :
    [
        TranslateModule,

        ModuleInput,
        ModuleIconFirefly,

        IonicPageModule.forChild(PageLogin)
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin
{ 

}