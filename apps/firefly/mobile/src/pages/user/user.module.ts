import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {PageUser} from './user';

import {PageUserProfile}  from '../user.profile/user.profile';
import {PageUserSettings} from '../user.settings/user.settings';

@NgModule
({
    imports : [IonicPageModule.forChild(PageUser)],

    declarations :
    [
        PageUser,

        PageUserProfile,
        PageUserSettings
    ]
})

export class ModulePageUser
{ 

}