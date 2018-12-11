import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ModuleComponentMap } from '@firefly/core';
import { ComponentItemMap } from './item-map.component';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule,
        ModuleComponentMap
    ],

    declarations : [ComponentItemMap],
    exports      : [ComponentItemMap]
})
export class ModuleComponentItemMap { }
