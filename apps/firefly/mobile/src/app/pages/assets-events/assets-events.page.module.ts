import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsEvents } from './assets-events.page';
import { ModuleDirectiveElevation } from '@theory/google';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation
    ],

    declarations    : [PageAssetsEvents],
    exports         : [PageAssetsEvents],
    entryComponents : [PageAssetsEvents]
})
export class ModulePageAssetsEvents { }
