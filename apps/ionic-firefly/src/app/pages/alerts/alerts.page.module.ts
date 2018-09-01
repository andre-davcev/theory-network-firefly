import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PageNotifications } from './alerts.page';

@NgModule
({
    imports :
    [
        TranslateModule
    ],

    declarations :
    [
        PageNotifications
    ]
})

export class ModulePageNotifications { }
