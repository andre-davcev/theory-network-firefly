import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsPlaces} from './assets-places.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsPlaces),
        TranslateModule
    ],

    declarations :
    [
        PageAssetsPlaces
    ]
})

export class ModulePageAssetsPlaces
{

}
