import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsIcons} from './assets-icons.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsIcons),
        TranslateModule
    ],

    declarations :
    [
        PageAssetsIcons
    ]
})

export class ModulePageAssetsIcons
{

}
