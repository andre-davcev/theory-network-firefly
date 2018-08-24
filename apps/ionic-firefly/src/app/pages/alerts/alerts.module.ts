import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import {PageNotifications} from './alerts';
import { PagePublisherCluster } from '../cluster/cluster.page';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageNotifications)
    ],

    declarations :
    [
        PageNotifications
    ]
})

export class ModulePageNotifications
{

}
