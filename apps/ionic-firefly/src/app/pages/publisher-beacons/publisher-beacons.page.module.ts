import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PagePublisherBeacons } from './publisher-beacons.page';
import { IonicModule } from '@ionic/angular';

@NgModule
({

    imports :
    [
        TranslateModule,
        IonicModule
    ],

    declarations :
    [
        PagePublisherBeacons
    ]
})

export class ModulePagePublisherBeacons
{

}
