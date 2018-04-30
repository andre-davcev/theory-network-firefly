import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map.component';

@NgModule
({
    imports :
    [
        CommonModule,
        LeafletModule
    ],

    declarations: [MapComponent],
    exports: [MapComponent]
})
export class MapModule { }
