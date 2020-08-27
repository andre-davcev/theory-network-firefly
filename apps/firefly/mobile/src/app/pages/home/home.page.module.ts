import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentSlide } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageHome } from './home.page.routes';
import { PageHome } from './home.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModulePageLogin } from '../login';
import { ModulePageAlert } from '../alert';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageHome),
        ModuleComponentSlide,
        ModuleDirectiveElevation,
        ModulePageLogin,
        ModulePageAlert
    ],

    declarations : [PageHome],
    exports      : [PageHome]
})
export class ModulePageHome {}
