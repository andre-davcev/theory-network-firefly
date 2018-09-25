import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageHome } from './home.page';
import { ModulePage } from '../page.module';
import { ModuleComponentSlide } from '../../components/slide/slide.component.module';

export const routes: Routes =
[
    {path : '', component : PageHome
}];

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(routes),
        ModuleComponentSlide
    ],

    declarations: [PageHome]
})
export class ModulePageHome {}
