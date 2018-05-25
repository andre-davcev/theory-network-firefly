import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {PageUser} from './user';

import {PageUserProfile}  from '../user.profile/user.profile';
import {PageUserSettings} from '../user.settings/user.settings';
import { TranslateModule } from '@ngx-translate/core';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PageUser),
        TranslateModule
    ],

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
