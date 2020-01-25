import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentSlide } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageHome } from './home.page.routes';
import { PageHome } from './home.page';
import { ModuleDirectiveElevation } from '@theory/google';

@NgModule
({
    imports :
    [
        ModulePage,
        CommonModule,
        RouterModule.forChild(RoutesPageHome),
        ModuleComponentSlide,
        TranslateModule,
        ModuleDirectiveElevation
    ],

    declarations : [PageHome],
    exports      : [PageHome]
})
export class ModulePageHome {}
