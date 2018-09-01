import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PagePublisherClusterLocationsAdd } from '../cluster-locations-add/cluster-locations-add.page';

@NgModule
({
    imports :
    [
        TranslateModule
    ],

    declarations :
    [
        PagePublisherClusterLocationsAdd
    ],

    exports :
    [
        PagePublisherClusterLocationsAdd
    ],

    entryComponents :
    [
        PagePublisherClusterLocationsAdd
    ]
})

export class ModulePagePublisherClusterLocationsAdd { }
