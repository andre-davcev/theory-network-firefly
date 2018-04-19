import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherBeacon} from './publisher.beacon';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisherBeacon)
    ],

    declarations : [PagePublisherBeacon]
})

export class ModulePagePublisherBeacon
{ 

}