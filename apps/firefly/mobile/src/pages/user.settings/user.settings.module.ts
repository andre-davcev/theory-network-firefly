import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {PageUserSettings} from './user.settings';

@NgModule
({
    declarations : [PageUserSettings],
    imports      : [IonicPageModule.forChild(PageUserSettings)]
})

export class ModulePageUserSettings
{ 

}