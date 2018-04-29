import {Component, AfterViewInit} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { StateCluster } from '../../ngxs/cluster/cluster.state';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

import { MapOptions, tileLayer, latLng } from 'leaflet';

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

    constructor(private store: Store)
    {

    }
}
