import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentMapAnnotation } from './map-annotation.component';
import { ModuleDirectiveElevation } from '@theory/google';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule,
        ModuleDirectiveElevation
    ],

    declarations    : [ComponentMapAnnotation],
    exports         : [ComponentMapAnnotation],
    entryComponents : [ComponentMapAnnotation]
})
export class ModuleComponentMapAnnotation { }
