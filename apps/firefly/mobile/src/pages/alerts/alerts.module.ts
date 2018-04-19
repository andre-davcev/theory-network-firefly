import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import {PageAlerts} from './alerts';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageAlerts)
    ],

    declarations : 
    [
        PageAlerts
    ]
})

export class ModulePageAlerts
{ 

}