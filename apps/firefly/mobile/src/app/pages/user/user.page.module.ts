import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { ModulePageUserProfile } from '@firefly/page/user-profile';
import { ModulePagePublisherAssets } from '@firefly/page/publisher-assets';

import { PageUser } from './user.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { RouterModule } from '@angular/router';
import { RoutesPageUser } from './user.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageUserProfile,
        ModulePagePublisherAssets,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageUser)
    ],

    declarations : [PageUser],
    exports: [PageUser]
})

export class ModulePageUser
{

}
