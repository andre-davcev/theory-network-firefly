import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageUserSettings } from './user-settings.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageUserSettings],
    exports: [PageUserSettings]
})

export class ModulePageUserSettings
{

}
