import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { ComponentMap } from './map.component';
import { ModuleComponentMapOrb } from '../map-orb';
import { ModuleComponentMapPin } from '../map-pin';
import { ModuleComponentMapAnnotation } from '../map-annotation';
import { ModuleComponentLoading } from '../loading';

@NgModule
({
    imports :
    [
        CommonModule,
        ModuleComponentMapOrb,
        NgxMapboxGLModule,
        ModuleComponentMapPin,
        ModuleComponentMapAnnotation,
        ModuleComponentLoading
    ],

    declarations: [ComponentMap],
    exports: [ComponentMap]
})
export class ModuleComponentMap { }
