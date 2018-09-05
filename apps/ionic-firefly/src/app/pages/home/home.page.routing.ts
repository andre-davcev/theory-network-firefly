import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHome } from './home.page';

export const routes: Routes =
[
    {path : '', component : PageHome
}];

@NgModule
({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulePageHomeRouting {}
