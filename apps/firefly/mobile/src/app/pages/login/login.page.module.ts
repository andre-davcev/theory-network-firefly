import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentLogo, ModuleComponentAuth, ModuleComponentTutorial, ModuleComponentIconMessage, ModuleComponentButtonAction } from '@firefly/core';

import { ModulePage } from '../../modules';
import { PageLogin } from './login.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ReactiveFormsModule,
        ModuleComponentLogo,
        ModuleComponentAuth,
        ModuleComponentTutorial,
        ModuleComponentIconMessage,
        ModuleComponentButtonAction
    ],

    declarations    : [PageLogin],
    exports         : [PageLogin],
    entryComponents : [PageLogin]
})

export class ModulePageLogin { }
