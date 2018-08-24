import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsBeacons} from './assets-beacons.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsBeacons),
        TranslateModule
    ],

    declarations :
    [
        PageAssetsBeacons
    ]
})

export class ModulePageAssetsBeacons
{

}
