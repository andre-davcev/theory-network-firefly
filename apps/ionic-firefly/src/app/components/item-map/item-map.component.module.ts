import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentItemMap } from './item-map.component';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule
    ],

    declarations : [ComponentItemMap],
    exports      : [ComponentItemMap]
})
export class ModuleItemMap { }
