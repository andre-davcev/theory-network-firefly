import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentSlide } from '@firefly/mobile';

import { ModulePage } from '../../modules';
import { RoutesPageHome } from './home.page.routes';
import { PageHome } from './home.page';
import { ModulePageLogin } from '../login';
import { ModulePageNotifications } from '../notifications';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageHome),
        ModuleComponentSlide,
        ModuleDirectiveElevation,
        ModulePageLogin,
        ModulePageNotifications
    ],

    declarations : [PageHome],
    exports      : [PageHome]
})
export class ModulePageHome {}
