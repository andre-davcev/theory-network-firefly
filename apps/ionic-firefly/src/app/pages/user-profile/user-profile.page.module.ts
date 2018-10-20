import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageUserProfile } from './user-profile.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageUserProfile],
    exports: [PageUserProfile]
})

export class ModulePageUserProfile
{

}
