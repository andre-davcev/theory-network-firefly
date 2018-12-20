import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { ModulePageUserProfile } from '@firefly/page/user-profile';
import { ModulePageUserSettings } from '@firefly/page/user-settings';
import { PageUser } from './user.page';
import { RoutesPageUser } from './user.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageUserProfile,
        ModulePageUserSettings,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageUser)
    ],

    declarations : [PageUser],
    exports: [PageUser]
})

export class ModulePageUser { }
