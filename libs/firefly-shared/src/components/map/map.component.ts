import { Component, OnInit, Input, HostBinding, AfterViewInit, Output, EventEmitter, ViewChildren, QueryList, OnChanges, SimpleChanges, Inject, NgZone } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, takeUntil, delay, switchMap, map } from 'rxjs/operators';
import { LngLatLike, Point, Popup, Map } from 'mapbox-gl';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';
import { Results, Result, MapboxGeocoder, LngLatLiteral } from '@mapbox/mapbox-gl-geocoder';

import { StateDevice, StateLanguage, StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { EnvironmentMapbox, MapboxEnvironment, MapMovingMethod } from '@theory/mapbox';
import { MapboxPlaceType, MapboxMapStyle, MapboxControlPosition, MapboxMarkerAnchor } from '@theory/mapbox';
import { Place } from '@firefly/cloud';

import { Color } from '../../enums';

@Component
({
    selector    : 'ff-map',
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
    private geocoder: MapboxGeocoder;

    @ViewChildren('map')    maps:    QueryList<MapComponent>;
    @ViewChildren('marker') markers: QueryList<MarkerComponent>;

    public annotationOffset : Point  = new Point(22, 2);

    @Input()
    @HostBinding('style.width')
    public width: string = '100%';

    @Input()
    @HostBinding('style.height')
    public height: string = '100%';

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

    @Output() clear         : EventEmitter<void>    = new EventEmitter<void>();
    @Output() loading       : EventEmitter<string>  = new EventEmitter<string>();
    @Output() searchResults : EventEmitter<Results> = new EventEmitter<Results>();
    @Output() searchResult  : EventEmitter<Result>  = new EventEmitter<Result>();
    @Output() searchError   : EventEmitter<any>     = new EventEmitter<any>();

    private map: Map;

    constructor(
      private store: Store,
      private zone: NgZone,
      @Inject(MapboxEnvironment) private environment: EnvironmentMapbox
    )
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


    public onLoad(map: Map): void
    {
        if (this.geocode)
        {
            this.geocoder = this.createGeocoder();

            map.addControl(this.geocoder);

            this.language$.pipe(takeUntil(this.destroy$)).subscribe((language: string) =>
              this.geocoder.setLanguage(language)
            );

            this.locationLiteral$.pipe(takeUntil(this.destroy$)).subscribe((proximity: LngLatLiteral) =>
              this.geocoder.setProximity(proximity)
            );
        }

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
        this.searchResults.next(results);

        this.resizeMap();
    }

    public eventResult(event: { result: Result }): void
    {
        this.searchResult.next(event.result);

        this.resizeMap();
    }

    public eventError(error: any): void
    {
        this.searchError.next(error);

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

    private createGeocoder(): MapboxGeocoder
    {
        const language: string = this.store.selectSnapshot(StateLanguage.languageIso639_1);
        const proximity: LngLatLiteral = this.store.selectSnapshot(StateLocation.locationLiteral);

        const geocoder: MapboxGeocoder = new MapboxGeocoder({
          accessToken: this.environment.accessToken,
          position: this.geocodePosition,
          placeholder: this.placeholder,
          limit: this.limit,
          flyTo: this.flyTo,
          bbox: this.bbox,
          zoom: this.zoom,
          types: this.types.join(','),
          minLength: this.minLength,
          language,
          proximity
        });

        geocoder.
          on('results', (event: MapboxGeocoder.Results) => this.zone.run(() => this.clear.emit(event))).
          on('result', (event: { result: MapboxGeocoder.Result }) => this.zone.run(() => this.searchResult.emit(event))).
          on('error', (event: any) => this.zone.run(() => this.searchError.emit(event))).
          on('loading', (event: { query: string }) => this.zone.run(() => this.loading.emit(event.query))).
          on('clear', () => this.zone.run(() => this.clear.emit()));

        // [language]="language$ | async"
        // [proximity]="locationLiteral$ | async"

        return geocoder;
    }
}
