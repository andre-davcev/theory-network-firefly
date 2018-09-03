import { NgModule } from '@angular/core';

import { PageNotifications } from './alerts.page';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations :
    [
        PageNotifications
    ]
})

export class ModulePageNotifications { }
