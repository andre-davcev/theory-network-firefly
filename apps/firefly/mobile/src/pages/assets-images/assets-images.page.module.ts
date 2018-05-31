import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsImages} from './assets-images.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsImages),
        TranslateModule
    ],

    declarations :
    [
        PageAssetsImages
    ]
})

export class ModulePageAssetsImages
{

}
