import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import { PagePublisherClusterLocationsAdd } from '../cluster-locations-add/cluster-locations-add.page';
import { IonicModule } from 'ionic-angular';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicModule
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

export class ModulePagePublisherClusterLocationsAdd
{

}
