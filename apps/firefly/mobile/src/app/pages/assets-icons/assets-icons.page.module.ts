import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsIcons } from './assets-icons.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageAssetsIcons],
    exports : [PageAssetsIcons]
})

export class ModulePageAssetsIcons { }
