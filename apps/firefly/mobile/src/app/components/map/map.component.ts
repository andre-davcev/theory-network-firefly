import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MapOptions, tileLayer, latLng, LatLng, divIcon, DivIcon, marker, Marker } from 'leaflet';
import { Store, Select } from '@ngxs/store';
import { StateLocation } from '../../../ngxs/location.state';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';
import { ComponentMapOrb } from '../map-orb/map-orb.component';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';


@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
//    styleUrls   : ['./map.component.scss']
})
export class ComponentMap implements OnInit, AfterViewInit
{
    @Select(StateLocation.loading)  loading$  : Observable<boolean>;
    @Select(StateLocation.location) location$ : Observable<GeolocationPosition>;

    @ViewChild(LeafletDirective)
    public leafletDirective: LeafletDirective;

    @ViewChild(ComponentMapOrb)
    public mapOrbComponent: ComponentMapOrb;
    private mapOrbMarker: Marker;

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

    ngAfterViewInit(): void
    {
/*
        const mapOrbIcon: DivIcon = divIcon
        ({
            iconSize : null,
            html     : this.mapOrbComponent.html()
        });

        this.mapOrbMarker = marker(latLng(59.915, 10.735), {icon: mapOrbIcon}).addTo(this.leafletDirective.getMap());

        this.location$.subscribe((position: GeolocationPosition) =>
        {
            this.mapOrbMarker.setLatLng(latLng(position.coords.latitude, position.coords.longitude));
        });
*/
    }
}
