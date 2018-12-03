import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentSlide } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageHome } from './home.page.routes';
import { PageHome } from './home.page';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageHome),
        ModuleComponentSlide,
        TranslateModule
    ],

    declarations : [PageHome],
    exports : [PageHome]
})
export class ModulePageHome {}
