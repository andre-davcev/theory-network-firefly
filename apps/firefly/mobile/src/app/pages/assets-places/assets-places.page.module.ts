import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsPlaces } from './assets-places.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageAssetsPlaces],
    exports : [PageAssetsPlaces]
})

export class ModulePageAssetsPlaces { }
