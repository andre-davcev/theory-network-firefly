import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentItemHeader } from '@firefly/mobile';
import { ModulePage, PageAssetsIcon } from '@firefly/app';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemHeader
    ],

    declarations :
    [
        PageAssetsIcon
    ]
})

export class ModulePageAssetsIcon { }
