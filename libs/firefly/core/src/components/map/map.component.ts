import { Component, OnInit, Input, HostBinding, AfterViewInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, takeUntil, delay, switchMap, map } from 'rxjs/operators';
import { LngLatLike, Point } from 'mapbox-gl';

import { StateDevice, StateLanguage } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { Location } from '@firefly/core/models';
import { MapboxPlaceType, MapboxMapStyle, StateMap, MapboxControlPosition, MapboxMarkerAnchor, ActionMapSearchResultSet } from '@theory/mapbox';
import { LngLatLiteral, Results, Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { Color } from '@firefly/core/enums';
import { MarkerComponent } from 'ngx-mapbox-gl/lib/marker/marker.component';
import { MapMovingMethod } from '@theory/mapbox';

@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
    styleUrls   : ['./map.component.scss']
})
export class ComponentMap extends BaseComponent implements OnInit, AfterViewInit
{
    @Select(StateMap.locationValid)         locationValid$      : Observable<boolean>;
    @Select(StateMap.locationLike)          locationLike$       : Observable<LngLatLike>;
    @Select(StateMap.locationLiteral)       locationLiteral$    : Observable<LngLatLiteral>;
    @Select(StateMap.searchResult)          searchResult$       : Observable<Result>;
    @Select(StateMap.searchResultCenter)    searchResultCenter$ : Observable<LngLatLike>;
    @Select(StateDevice.web)                web$                : Observable<boolean>;
    @Select(StateLanguage.languageIso639_1) language$           : Observable<string>;

    @Input() geocodePosition: MapboxControlPosition = MapboxControlPosition.TopLeft;
    @Input() locations: Array<Location> = [];

    @Input() interactive: boolean        = true;
    @Input() geocode:     boolean        = false;
    @Input() style:       MapboxMapStyle = MapboxMapStyle.Streets;

    @Input() mapLoadingText: string;
    @Input() mapMovingMethod: MapMovingMethod = MapMovingMethod.FlyTo;

    public MapboxMarkerAnchor: any = MapboxMarkerAnchor;
    public mapReady$: Observable<boolean>;
    private contentInitiated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public Color: any = Color;

    @ViewChildren('marker') markers: QueryList<MarkerComponent>;

    public annotationOffset:      Point  = new Point(22, 2);
    public annotationTitle:       string = '';
    public annotationDescription: string = '';

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

    @Input() country?:   string;
    @Input() proximity?: LngLatLiteral;
    @Input() bbox?:      [number, number, number, number];
    @Input() zoom?:      number;
    @Input() minLength?: number;

    @Output() clear:   EventEmitter<void>    = new EventEmitter<void>();
    @Output() loading: EventEmitter<string>  = new EventEmitter<string>();
    @Output() results: EventEmitter<Results> = new EventEmitter<Results>();
    @Output() result:  EventEmitter<Result>  = new EventEmitter<Result>();
    @Output() error:   EventEmitter<any>     = new EventEmitter<any>();

    constructor(private store: Store)
    {
        super();
    }

    public ngOnInit(): void
    {
        this.mapReady$ = this.locationValid$.
        pipe
        (
            takeUntil(this.destroy$),
            filter((valid: boolean) => valid),
            switchMap(() => this.contentInitiated$),
            filter((initiated: boolean) => initiated),
            delay(100),
            map(() => true)
        );
    }

    public ngAfterViewInit(): void
    {
        this.contentInitiated$.next(true);
    }

    public eventClear(): void
    {
        this.clear.next();
    }

    public eventLoading(event: { query: string })
    {
        this.loading.next(event.query);
    }

    public eventResults(results: Results): void
    {
        this.results.next(results);
    }

    public eventResult(event: { result: Result }): void
    {
        const result: Result = event.result;
        const address: Array<string> = result.place_name.split(', ');

        this.result.next(result);

        this.store.dispatch(new ActionMapSearchResultSet(result));

        this.annotationTitle       = address[0];
        this.annotationDescription = address[1];

        setTimeout(() =>
        {
            this.markers.forEach((marker: MarkerComponent) =>
            {
                marker.togglePopup();
            });
        });
    }

    public eventError(error: any): void
    {
        this.error.next(error);
    }
}
