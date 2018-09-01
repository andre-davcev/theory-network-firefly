import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PageLogin } from './auth.page';

@NgModule
({
    imports :
    [
        TranslateModule
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin { }
