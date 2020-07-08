import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsEvents } from './assets-events.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';
import { ModulePipeTimestamp } from '@theory/firebase';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentIconMessage,
        ModuleComponentButtonAdd,
        ModulePipeTimestamp
    ],

    declarations    : [PageAssetsEvents],
    exports         : [PageAssetsEvents],
    entryComponents : [PageAssetsEvents]
})
export class ModulePageAssetsEvents { }
