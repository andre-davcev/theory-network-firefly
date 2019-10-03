import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetIcon } from './asset-icon.page';
import { RoutesPageAssetIcon } from './asset-icon.page.routes';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemHeader,
        RouterModule.forChild(RoutesPageAssetIcon)
    ],

    declarations : [PageAssetIcon],
    exports : [PageAssetIcon]
})

export class ModulePageAssetIcon { }
