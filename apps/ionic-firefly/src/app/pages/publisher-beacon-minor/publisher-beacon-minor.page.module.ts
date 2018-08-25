import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherBeaconMinor} from './publisher.beacon.minor';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisherBeaconMinor)
    ],

    declarations : [PagePublisherBeaconMinor]
})

export class ModulePagePublisherBeacons
{

}
