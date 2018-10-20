import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { ModulePageUserProfile } from '@firefly/app/page/user-profile';
import { ModulePagePublisherAssets } from '@firefly/app/page/publisher-assets';

import { PageUser } from './user.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageUserProfile,
        ModulePagePublisherAssets
    ],

    declarations : [PageUser],
    exports: [PageUser]
})

export class ModulePageUser
{

}
