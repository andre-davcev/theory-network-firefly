import { Component, OnInit } from '@angular/core';

import { Plugins, GeolocationPosition } from '@capacitor/core';
import { MapOptions, tileLayer, latLng, LatLng } from 'leaflet';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
//    styleUrls   : ['./map.component.scss']
})
export class MapComponent implements OnInit
{
    public options: MapOptions =
    {
        layers :
        [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],

        zoom: 5,
        center: latLng(46.879966, -121.726909)
    };

    public center: LatLng = latLng(46.879966, -121.726909);

    constructor() { }

    ngOnInit()
    {
        const { Geolocation } = Plugins;

        fromPromise(Geolocation.getCurrentPosition()).

        subscribe((coordinates: GeolocationPosition) =>
        {
            this.center = latLng(coordinates.coords.latitude, coordinates.coords.longitude);
        });
    }

}
