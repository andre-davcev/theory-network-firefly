import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetsIcon } from './assets-icon.page';
import { RoutesPageAssetsIcon } from './assets-icon.page.routes';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemHeader,
        RouterModule.forChild(RoutesPageAssetsIcon)
    ],

    declarations : [PageAssetsIcon],
    exports : [PageAssetsIcon]
})

export class ModulePageAssetsIcon { }
