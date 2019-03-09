import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentMapAnnotation } from './map-annotation.component';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule
    ],

    declarations    : [ComponentMapAnnotation],
    exports         : [ComponentMapAnnotation],
    entryComponents : [ComponentMapAnnotation]
})
export class ModuleComponentMapAnnotation { }
