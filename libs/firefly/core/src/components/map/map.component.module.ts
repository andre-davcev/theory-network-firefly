import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { ComponentMap } from './map.component';
import { ModuleComponentMapOrb } from '../map-orb/map-orb.component.module';

@NgModule
({
    imports :
    [
        CommonModule,
        ModuleComponentMapOrb,
        NgxMapboxGLModule
    ],

    declarations: [ComponentMap],
    exports: [ComponentMap]
})
export class ModuleComponentMap { }
