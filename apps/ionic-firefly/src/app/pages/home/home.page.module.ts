import { NgModule } from '@angular/core';

import { PageHome } from './home.page';
import { ModulePage } from '../page.module';
import { ModulePageHomeRouting } from './home.page.routing';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageHomeRouting
    ],

    declarations: [PageHome]
})
export class ModulePageHome {}
