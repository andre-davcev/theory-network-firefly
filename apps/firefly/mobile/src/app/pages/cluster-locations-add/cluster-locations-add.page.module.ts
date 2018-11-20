import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherClusterLocationsAdd } from './cluster-locations-add.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PagePublisherClusterLocationsAdd],
    exports : [PagePublisherClusterLocationsAdd]
})

export class ModulePagePublisherClusterLocationsAdd { }
