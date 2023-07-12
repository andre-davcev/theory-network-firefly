import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Result, Results } from '@mapbox/mapbox-gl-geocoder';
import { Select, Store } from '@ngxs/store';
import mapboxgl, { LngLatLike, Map, Point, Popup } from 'mapbox-gl';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { Place } from '@firefly/cloud';
import { StateDevice, StateLanguage, StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import {
  EnvironmentMapbox,
  MapMovingMethod,
  MapboxControlPosition,
  MapboxEnvironment,
  MapboxMapStyle,
  MapboxMarkerAnchor,
  MapboxPlaceType
} from '@theory/mapbox';

import { Color } from '../../enums';

@Component({
  selector: 'ff-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class ComponentMap
  extends BaseComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Select(StateLocation.isValid) locationValid$: Observable<boolean>;
  @Select(StateLocation.locationLike) locationLike$: Observable<LngLatLike>;
  @Select(StateDevice.web) web$: Observable<boolean>;
  @Select(StateLanguage.languageIso639_1) language$: Observable<string>;

  @Input() place: Place;
  @Input() geocodePosition: MapboxControlPosition =
    MapboxControlPosition.TopLeft;

  @Input() interactive: boolean = true;
  @Input() geocode: boolean = false;
  @Input() style: MapboxMapStyle = MapboxMapStyle.Streets;

  @Input() mapLoadingText: string;
  @Input() mapMovingMethod: MapMovingMethod = MapMovingMethod.FlyTo;

  public MapboxMarkerAnchor: any = MapboxMarkerAnchor;
  public mapReady$: Observable<boolean>;
  private contentInitiated$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public Color: any = Color;
  private geocoder: MapboxGeocoder;

  @ViewChildren('map') maps: QueryList<MapComponent>;
  @ViewChildren('marker') markers: QueryList<MarkerComponent>;

  public annotationOffset: Point = new Point(22, 2);

  @Input()
  @HostBinding('style.width')
  public width: string = '100%';

  @Input()
  @HostBinding('style.height')
  public height: string = '100%';

  @Input() searchInput: string = '';
  @Input() placeholder?: string = 'Search';
  @Input() limit: number = 5;
  @Input() flyTo: boolean = true;

  @Input() types: Array<MapboxPlaceType> = [
    MapboxPlaceType.Country,
    MapboxPlaceType.Region,
    MapboxPlaceType.Postcode,
    MapboxPlaceType.District,
    MapboxPlaceType.Place,
    MapboxPlaceType.Locality,
    MapboxPlaceType.Neighborhood,
    MapboxPlaceType.Address,
    MapboxPlaceType.PointOfInterest
  ];

  @Input() proximity?: string;
  @Input() bbox?: [number, number, number, number];
  @Input() zoom?: number;
  @Input() minLength?: number;

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();
  @Output() loading: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchResults: EventEmitter<Results> = new EventEmitter<Results>();
  @Output() searchResult: EventEmitter<Result> = new EventEmitter<Result>();
  @Output() searchError: EventEmitter<any> = new EventEmitter<any>();

  private map: Map;

  constructor(
    private store: Store,
    private zone: NgZone,
    @Inject(MapboxEnvironment) private environment: EnvironmentMapbox
  ) {
    super();
  }

  public ngOnInit(): void {
    this.mapReady$ = this.locationValid$.pipe(
      filter((valid: boolean) => valid),
      switchMap(() => this.contentInitiated$),
      filter((initiated: boolean) => initiated),
      delay(100),
      map(() => true)
    );

    this.mapReady$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.place != null)
      )
      .subscribe(() => this.openPopup());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.place?.currentValue) {
      this.openPopup();
    }
  }

  public onLoad(map: Map): void {
    if (this.geocode) {
      this.geocoder = this.createGeocoder();

      this.zone.runOutsideAngular(() => {
        map.addControl(this.geocoder, this.geocodePosition);
      });

      this.language$
        .pipe(takeUntil(this.destroy$))
        .subscribe((language: string) => this.geocoder.setLanguage(language));

      this.locationLike$
        .pipe(takeUntil(this.destroy$))
        .subscribe((proximity: LngLatLike) =>
          this.geocoder.setProximity(proximity)
        );
    }

    this.map = map;

    this.resizeMap();
  }

  public ngAfterViewInit(): void {
    this.contentInitiated$.next(true);
  }

  public eventClear(): void {
    this.clear.next();

    this.resizeMap();
  }

  public eventLoading(event: { query: string }) {
    this.loading.next(event.query);
  }

  public eventResults(results: Results): void {
    this.searchResults.next(results);

    this.resizeMap();
  }

  public eventResult(event: { result: Result }): void {
    this.searchResult.next(event.result);

    this.resizeMap();
  }

  public eventError(error: any): void {
    this.searchError.next(error);

    this.resizeMap();
  }

  public openPopup(): void {
    setTimeout(() => {
      const markers: QueryList<MarkerComponent> = this.markers;

      if (
        markers != null &&
        markers.first != null &&
        markers.first.markerInstance != null
      ) {
        const popup: Popup = markers.first.markerInstance.getPopup();

        if (popup != null) {
          popup.remove();
          popup.addTo(this.maps.first.mapInstance);
        }
      }

      this.resizeMap();
    });
  }

  private resizeMap(): void {
    if (this.map) {
      this.map.resize();
    }
  }

  private createGeocoder(): MapboxGeocoder {
    const language: string = this.store.selectSnapshot(
      StateLanguage.languageIso639_1
    );
    const proximity: LngLatLike = this.store.selectSnapshot(
      StateLocation.locationLike
    );

    const options: MapboxGeocoder.Options = {
      mapboxgl,
      accessToken: this.environment.accessToken,
      placeholder: this.placeholder,
      limit: this.limit,
      flyTo: this.flyTo,
      types: this.types.join(','),
      marker: false
    };

    if (this.bbox) {
      options.bbox = this.bbox;
    }
    if (this.zoom) {
      options.zoom = this.zoom;
    }
    if (this.minLength) {
      options.minLength = this.minLength;
    }
    if (proximity) {
      options.proximity = proximity;
    }
    if (language) {
      options.language = language;
    }

    const geocoder: MapboxGeocoder = new MapboxGeocoder(options);

    geocoder
      .on('results', (event: MapboxGeocoder.Results) =>
        this.zone.run(() => this.clear.emit(event))
      )
      .on('result', (event: { result: MapboxGeocoder.Result }) =>
        this.zone.run(() => this.searchResult.emit(event.result))
      )
      .on('error', (event: any) =>
        this.zone.run(() => this.searchError.emit(event))
      )
      .on('loading', (event: { query: string }) =>
        this.zone.run(() => this.loading.emit(event.query))
      )
      .on('clear', () => this.zone.run(() => this.clear.emit()));

    return geocoder;
  }
}
