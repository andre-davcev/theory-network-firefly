import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsCoupons} from './assets-coupons.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsCoupons),
        TranslateModule
    ],

    declarations :
    [
        PageAssetsCoupons
    ]
})

export class ModulePageAssetsCoupons
{

}
