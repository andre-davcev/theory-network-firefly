import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentMapAnnotation } from './map-annotation.component';

@NgModule
({
    imports :
    [
        CommonModule
    ],

    declarations    : [ComponentMapAnnotation],
    exports         : [ComponentMapAnnotation],
    entryComponents : [ComponentMapAnnotation]
})
export class ModuleComponentMapAnnotation { }
