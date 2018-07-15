import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import { PageSubscriptions } from './subscriptions.page';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageSubscriptions)
    ],

    declarations :
    [
        PageSubscriptions
    ]
})

export class ModulePageSubscriptions
{

}
