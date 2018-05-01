import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ComponentMap } from './map.component';

@NgModule
({
    imports :
    [
        CommonModule,
        LeafletModule
    ],

    declarations: [ComponentMap],
    exports: [ComponentMap]
})
export class MapModule { }
