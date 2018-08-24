import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherAssets} from './publisher-assets';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisherAssets)
    ],

    declarations : [PagePublisherAssets]
})

export class ModulePagePublisherAssets
{

}
