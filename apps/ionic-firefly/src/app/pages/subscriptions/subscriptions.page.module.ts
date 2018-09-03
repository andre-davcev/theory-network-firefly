import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PageSubscriptions } from './subscriptions.page';
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
        PageSubscriptions
    ]
})

export class ModulePageSubscriptions
{

}
