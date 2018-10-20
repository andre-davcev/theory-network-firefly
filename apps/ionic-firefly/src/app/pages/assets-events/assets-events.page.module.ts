import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsEvents } from './assets-events.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageAssetsEvents],
    exports : [PageAssetsEvents]
})
export class ModulePageAssetsEvents { }
