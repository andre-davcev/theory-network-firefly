import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentItemImage } from './item-image.component';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule
    ],

    declarations : [ComponentItemImage],
    exports      : [ComponentItemImage]
})
export class ModuleComponentItemImage { }
