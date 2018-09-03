import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PageSearch } from './search.page';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicModule
    ],

    declarations :
    [
        PageSearch
    ]
})

export class ModulePageSearch
{

}
