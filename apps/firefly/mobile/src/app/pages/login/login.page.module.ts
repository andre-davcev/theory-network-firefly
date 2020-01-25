import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentLogo } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageLogin } from './login.page.routes';
import { PageLogin } from './login.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ReactiveFormsModule,
        ModuleComponentLogo,
        RouterModule.forChild(RoutesPageLogin)
    ],

    declarations    : [PageLogin],
    exports         : [PageLogin],
    entryComponents : [PageLogin]
})

export class ModulePageLogin { }
