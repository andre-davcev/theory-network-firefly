import { Component, OnInit, Input, HostBinding, AfterViewInit, Output, EventEmitter, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, takeUntil, delay, switchMap, map } from 'rxjs/operators';
import { LngLatLike, Point, Popup } from 'mapbox-gl';

import { StateDevice, StateLanguage, StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { MapboxPlaceType, MapboxMapStyle, MapboxControlPosition, MapboxMarkerAnchor } from '@theory/mapbox';
import { Results, Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { LngLatLiteral } from '@mapbox/mapbox-gl-geocoder'
import { Color } from '@firefly/core/enums';
import { MapMovingMethod } from '@theory/mapbox';
import { MapComponent } from 'ngx-mapbox-gl';
import { MarkerComponent } from 'ngx-mapbox-gl/lib/marker/marker.component';
import { Place } from '@firefly/cloud';

@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
    styleUrls   : ['./map.component.scss']
})
export class ComponentMap extends BaseComponent implements OnInit, AfterViewInit, OnChanges
{
    @Select(StateLocation.isValid)          locationValid$      : Observable<boolean>;
    @Select(StateLocation.locationLike)     locationLike$       : Observable<LngLatLike>;
    @Select(StateLocation.locationLiteral)  locationLiteral$    : Observable<LngLatLiteral>;
    @Select(StateDevice.web)                web$                : Observable<boolean>;
    @Select(StateLanguage.languageIso639_1) language$           : Observable<string>;

    @Input() place:           Place;
    @Input() geocodePosition: MapboxControlPosition = MapboxControlPosition.TopLeft;

    @Input() interactive: boolean        = true;
    @Input() geocode:     boolean        = false;
    @Input() style:       MapboxMapStyle = MapboxMapStyle.Streets;

    @Input() mapLoadingText: string;
    @Input() mapMovingMethod: MapMovingMethod = MapMovingMethod.FlyTo;

    public MapboxMarkerAnchor: any = MapboxMarkerAnchor;
    public mapReady$: Observable<boolean>;
    private contentInitiated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public Color: any = Color;

    @ViewChildren('map')    maps:    QueryList<MapComponent>;
    @ViewChildren('marker') markers: QueryList<MarkerComponent>;

    public annotationOffset : Point  = new Point(22, 2);

    @Input()
    @HostBinding('style.width')
    public width: string = '100%';

    @Input()
    @HostBinding('style.height')
    public height: string = '100%';

    @Input() searchInput:  string  = '';
    @Input() placeholder?: string  = 'Search';
    @Input() limit:        number  = 5;
    @Input() flyTo:        boolean = true;

    @Input() types: Array<MapboxPlaceType> =
    [
        MapboxPlaceType.Country,
        MapboxPlaceType.Region,
        MapboxPlaceType.Postcode,
        MapboxPlaceType.District,
        MapboxPlaceType.Place,
        MapboxPlaceType.Locality,
        MapboxPlaceType.Neighborhood,
        MapboxPlaceType.Address,
        MapboxPlaceType.PointOfInterest,
        MapboxPlaceType.PointOfInterestLandmark
    ];

    @Input() proximity?: LngLatLiteral;
    @Input() bbox?:      [number, number, number, number];
    @Input() zoom?:      number;
    @Input() minLength?: number;

    @Output() clear:   EventEmitter<void>    = new EventEmitter<void>();
    @Output() loading: EventEmitter<string>  = new EventEmitter<string>();
    @Output() results: EventEmitter<Results> = new EventEmitter<Results>();
    @Output() result:  EventEmitter<Result>  = new EventEmitter<Result>();
    @Output() error:   EventEmitter<any>     = new EventEmitter<any>();

    private map: mapboxgl.Map;

    constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        this.mapReady$ = this.locationValid$.
        pipe
        (
            filter((valid: boolean) => valid),
            switchMap(() => this.contentInitiated$),
            filter((initiated: boolean) => initiated),
            delay(100),
            map(() => true)
        );

        this.mapReady$.
        pipe
        (
            takeUntil(this.destroy$),
            filter(() => this.place != null)
        ).
        subscribe(() =>
            this.openPopup()
        );
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.place?.currentValue)
        {
            this.openPopup();
        }
    }


    public onLoad(map: mapboxgl.Map): void
    {
        this.map = map;

        this.resizeMap();
    }

    public ngAfterViewInit(): void
    {
        this.contentInitiated$.next(true);
    }

    public eventClear(): void
    {
        this.clear.next();

        this.resizeMap();
    }

    public eventLoading(event: { query: string })
    {
        this.loading.next(event.query);
    }

    public eventResults(results: Results): void
    {
        this.results.next(results);

        this.resizeMap();
    }

    public eventResult(event: { result: Result }): void
    {
        this.result.next(event.result);

        this.resizeMap();
    }

    public eventError(error: any): void
    {
        this.error.next(error);

        this.resizeMap();
    }

    public openPopup(): void
    {
        setTimeout(() =>
        {
            const markers: QueryList<MarkerComponent> = this.markers;

            if (markers != null && markers.first != null && markers.first.markerInstance != null)
            {
                const popup: Popup = markers.first.markerInstance.getPopup();

                if (popup != null)
                {
                    popup.remove();
                    popup.addTo(this.maps.first.mapInstance);
                }
            }

            this.resizeMap();
        });
    }

    private resizeMap(): void
    {
        if (this.map)
        {
            this.map.resize();
        }
    }
}
