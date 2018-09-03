import { NgModule } from '@angular/core';

import { ModulePage } from '../page.module';
import { PageUser } from './user.page';
import { PageUserProfile } from '../user-profile/user-profile.page';
import { PagePublisherAssets } from '../publisher-assets/publisher-assets.page';

@NgModule
({
    imports :
    [
        ModulePage
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
