import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIcon } from '@firefly/core';
import { ModuleComponentItemHeader } from '@firefly/mobile';

import { ModulePage } from '../../modules';
import { PageUserProfile } from './user-profile.page';
import { RoutesPageUserProfile } from './user-profile.page.routes';

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
