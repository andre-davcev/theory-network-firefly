import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemImage } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetImage } from './asset-image.page';
import { RoutesPageAssetImage } from './asset-image.page.routes';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemImage,
        RouterModule.forChild(RoutesPageAssetImage),
        NgxsFormPluginModule
    ],

    declarations : [PageAssetImage],
    exports : [PageAssetImage]
})

export class ModulePageAssetImage { }
