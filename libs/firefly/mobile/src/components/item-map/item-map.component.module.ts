import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ModuleComponentMap, ModuleDirectiveLoading } from '@firefly/core';

import { ComponentItemMap } from './item-map.component';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule,
        ModuleComponentMap,
        ModuleDirectiveLoading
    ],

    declarations : [ComponentItemMap],
    exports      : [ComponentItemMap]
})
export class ModuleComponentItemMap { }
