import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageFindCategories} from './find.categories';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageFindCategories)
    ],

    declarations :
    [
        PageFindCategories
    ]
})

export class ModulePageFindCategories
{ 

}