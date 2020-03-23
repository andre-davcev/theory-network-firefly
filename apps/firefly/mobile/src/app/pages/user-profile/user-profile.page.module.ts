import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageUserProfile } from './user-profile.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { RoutesPageUserProfile } from './user-profile.page.routes';
import { RouterModule } from '@angular/router';
import { ModuleComponentIcon } from '@firefly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleComponentItemHeader } from '@firefly/mobile';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageUserProfile),
        ModuleDirectiveElevation,
        ModuleComponentIcon,
        ReactiveFormsModule,
        ModuleComponentItemHeader,
        NgxsFormPluginModule
    ],

    declarations : [PageUserProfile],
    exports: [PageUserProfile]
})

export class ModulePageUserProfile
{

}
