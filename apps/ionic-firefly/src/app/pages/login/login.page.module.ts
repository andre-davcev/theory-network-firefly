import { NgModule } from '@angular/core';

import { PageLogin } from './login.page';
import { ModulePage } from '../page.module';
import { ModuleComponentIconFirefly } from '../../components/icon-firefly/icon-firefly.component.module';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes =
[
    { path: '', component: PageLogin }
];

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIconFirefly,
        RouterModule.forChild(routes)
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin { }
