import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentMapPin } from './map-pin.component';

@NgModule
({
    imports :
    [
        CommonModule
    ],

    declarations    : [ComponentMapPin],
    exports         : [ComponentMapPin],
    entryComponents : [ComponentMapPin]
})
export class ModuleComponentMapPin { }
