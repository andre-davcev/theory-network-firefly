import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageFindDiscover} from './find.discover';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageFindDiscover)
    ],

    declarations :
    [
        PageFindDiscover
    ]
})

export class ModulePageFindDiscover
{ 

}