import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {PageUserProfile} from './user.profile';

@NgModule
({
    declarations : [PageUserProfile],
    imports      : [IonicPageModule.forChild(PageUserProfile)]
})

export class ModulePageUserProfile
{ 

}