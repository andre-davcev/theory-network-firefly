import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageTabs} from './tabs';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageTabs)
    ],

    declarations :
    [
        PageTabs
    ]
})

export class ModulePageTabs
{ 

}