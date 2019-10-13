import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentIconFirefly } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageLogin } from './login.page.routes';
import { PageLogin } from './login.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ReactiveFormsModule,
        ModuleComponentIconFirefly,
        RouterModule.forChild(RoutesPageLogin)
    ],

    declarations : [PageLogin],
    exports : [PageLogin]
})

export class ModulePageLogin { }
