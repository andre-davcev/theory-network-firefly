import { NgModule } from '@angular/core';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';
import { ModulePipeTimestamp } from '@theory/firebase';

import { ModulePage } from '../../modules';
import { PageAssetsEvents } from './assets-events.page';

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
