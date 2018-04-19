import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherBeacons} from './publisher';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisherBeacons)
    ],
    
    declarations : [PagePublisherBeacons]
})

export class ModulePagePublisherBeacons
{ 

}