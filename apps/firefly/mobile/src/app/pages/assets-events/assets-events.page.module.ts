import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsEvents } from './assets-events.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentIconMessage,
        ModuleComponentButtonAdd
    ],

    declarations    : [PageAssetsEvents],
    exports         : [PageAssetsEvents],
    entryComponents : [PageAssetsEvents]
})
export class ModulePageAssetsEvents { }
