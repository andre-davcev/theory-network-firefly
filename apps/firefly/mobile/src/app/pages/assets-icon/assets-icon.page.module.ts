import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentItemHeader } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetsIcon } from './assets-icon.page';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemHeader
    ],

    declarations : [PageAssetsIcon],
    exports : [PageAssetsIcon]
})

export class ModulePageAssetsIcon { }
