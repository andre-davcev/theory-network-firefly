import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import {PageNotifications} from './alerts';

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