import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {PageUser} from './user';

import {PageUserProfile}  from '../user.profile/user.profile';
import { TranslateModule } from '@ngx-translate/core';
import { PagePublisherAssets } from '../publisher-assets/publisher-assets';

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
        PagePublisherAssets
    ]
})

export class ModulePageUser
{

}
