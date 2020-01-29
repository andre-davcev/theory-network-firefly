import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentLogo, ModuleComponentAuth } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { PageLogin } from './login.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ReactiveFormsModule,
        ModuleComponentLogo,
        ModuleComponentAuth
    ],

    declarations    : [PageLogin],
    exports         : [PageLogin],
    entryComponents : [PageLogin]
})

export class ModulePageLogin { }
