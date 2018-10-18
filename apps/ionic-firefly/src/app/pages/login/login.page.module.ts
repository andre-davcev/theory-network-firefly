import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentIconFirefly } from '@firefly/core';
import { ModulePage, PageLogin, RoutesHome } from '@firefly/app';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIconFirefly,
        RouterModule.forChild(RoutesHome)
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin { }
