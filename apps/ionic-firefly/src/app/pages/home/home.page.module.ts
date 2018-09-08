import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageHome } from './home.page';
import { ModulePage } from '../page.module';

export const routes: Routes =
[
    {path : '', component : PageHome
}];

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(routes)
    ],

    declarations: [PageHome]
})
export class ModulePageHome {}
