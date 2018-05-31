import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageAssetsEvents} from './assets-events.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageAssetsEvents),
        TranslateModule
    ],

    declarations :
    [
        PageAssetsEvents
    ]
})

export class ModulePageAssetsEvents
{

}
