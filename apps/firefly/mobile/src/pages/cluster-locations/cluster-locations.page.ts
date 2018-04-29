import {Component, AfterViewInit} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

import { Plugins, GeolocationPosition } from '@capacitor/core';
const { Geolocation } = Plugins;

import { StateCluster } from '../../ngxs/cluster/cluster.state';


import { MapOptions, tileLayer, latLng, LatLng } from 'leaflet';
import { fromPromise } from 'rxjs/observable/fromPromise';

@IonicPage()
@Component
({
    selector    : 'app-page-cluster-locations',
    templateUrl : 'cluster-locations.page.html'
})

export class PagePublisherClusterLocations
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

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

    constructor(private store: Store)
    {

    }

    public ionViewDidLoad(): void
    {
        fromPromise(Geolocation.getCurrentPosition()).

        subscribe((coordinates: GeolocationPosition) => {
            this.center = latLng(coordinates.coords.latitude, coordinates.coords.longitude);
        });
    }
}
