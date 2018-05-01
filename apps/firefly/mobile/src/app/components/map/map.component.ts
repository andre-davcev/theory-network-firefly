import { Component, OnInit } from '@angular/core';

import { MapOptions, tileLayer, latLng, LatLng } from 'leaflet';
import { Store, Select } from '@ngxs/store';
import { StateLocation } from '../../../ngxs/location.state';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';


@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
//    styleUrls   : ['./map.component.scss']
})
export class ComponentMap implements OnInit
{
    @Select(StateLocation.loading)  loading$  : Observable<boolean>;
    @Select(StateLocation.location) location$ : Observable<GeolocationPosition>;

    public options: MapOptions =
    {
        layers :
        [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],

        zoom: 11
    };

    constructor(private store: Store) { }

    ngOnInit()
    {
        this.loading$.pipe
        (
            filter((loading: boolean) => !loading),
            switchMap((loading: boolean) => this.location$)
        ).

        subscribe((position: GeolocationPosition) =>
        {
            this.options.center = latLng(position.coords.latitude, position.coords.longitude);
        });
    }
}
