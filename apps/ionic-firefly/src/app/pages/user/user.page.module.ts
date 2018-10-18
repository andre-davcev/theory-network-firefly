import { NgModule } from '@angular/core';

import { ModulePage, PageUser, PageUserProfile, PagePublisherAssets } from '@firefly/app';

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
