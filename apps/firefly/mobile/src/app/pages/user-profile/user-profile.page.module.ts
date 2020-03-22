import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageUserProfile } from './user-profile.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { RoutesPageUserProfile } from './user-profile.page.routes';
import { RouterModule } from '@angular/router';
import { ModuleComponentIcon } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageUserProfile),
        ModuleDirectiveElevation,
        ModuleComponentIcon
    ],

    declarations : [PageUserProfile],
    exports: [PageUserProfile]
})

export class ModulePageUserProfile
{

}
