import { NgModule } from '@angular/core';

import { PageLogin } from './auth.page';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin { }
