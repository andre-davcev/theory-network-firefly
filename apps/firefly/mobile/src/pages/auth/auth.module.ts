import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {ModuleComponents} from '@theory/firefly/components';

import {PageLogin} from './auth';
import {FFIcon}    from '../../app/directives/icon/icon';

import {TranslateModule} from '@ngx-translate/core';


@NgModule
({
    imports :
    [
        TranslateModule,

        ModuleComponents,

        IonicPageModule.forChild(PageLogin)
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin
{

}
