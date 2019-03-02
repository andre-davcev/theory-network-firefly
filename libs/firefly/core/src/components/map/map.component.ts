import { Component, OnInit, Input, HostBinding, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, takeUntil, delay, switchMap, map } from 'rxjs/operators';
import { LngLatLike } from 'mapbox-gl';

import { StateDevice, StateLocation, StateLanguage } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { Location } from '@firefly/core/models';
import { MapboxPlaceType, MapboxMapStyle, StateMap, MapboxControlPosition, MapboxMarkerAnchor } from '@theory/mapbox';
import { LngLatLiteral, Results, Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
    styleUrls   : ['./map.component.scss']
})
export class ComponentMap extends BaseComponent implements OnInit, AfterViewInit
{
    @Select(StateLocation.loading)          loading$         : Observable<boolean>;
    @Select(StateMap.locationValid)         locationValid$   : Observable<boolean>;
    @Select(StateMap.locationLike)          locationLike$    : Observable<LngLatLike>;
    @Select(StateMap.locationLiteral)       locationLiteral$ : Observable<LngLatLiteral>;
    @Select(StateDevice.web)                web$             : Observable<boolean>;
    @Select(StateLanguage.languageIso639_1) language$        : Observable<string>;

    @Input() geocodePosition: MapboxControlPosition = MapboxControlPosition.TopLeft;
    @Input() locations: Array<Location> = [];

    @Input() interactive: boolean        = true;
    @Input() geocode:     boolean        = false;
    @Input() style:       MapboxMapStyle = MapboxMapStyle.Streets;

    public MapboxMarkerAnchor: any = MapboxMarkerAnchor;
    public  mapReady$: Observable<boolean>;
    private contentInitiated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

    constructor()
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
        console.log(event);
        this.result.next(event.result);
    }

    public eventError(error: any): void
    {
        this.error.next(error);
    }
}
