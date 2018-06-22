import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsIcon} from './assets-icon.page';
import { ModuleItemHeader } from '../../app/components/item-header/item-header.module';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsIcon),
        ModuleItemHeader,
        TranslateModule
    ],

    declarations :
    [
        PageAssetsIcon
    ]
})

export class ModulePageAssetsIcon
{

}
