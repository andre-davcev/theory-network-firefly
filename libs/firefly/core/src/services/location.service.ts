import { ServiceMapbox, ContextItem, MapboxPlaceType, ParamsForwardGeocode, ResponseGeocode, ParamsReverseGeocode } from '@theory/mapbox';
import { ServiceBigDataCloud, ResponseReverseGeocode } from '@theory/bigdatacloud';

import { Observable, of } from 'rxjs';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { GeoPoint } from '@theory/firebase';
import { map, switchMap, tap } from 'rxjs/operators';

import { ReverseMode } from '@theory/mapbox';
import { Place, CityInfo, Event } from '@firefly/cloud';
import { Injectable } from '@angular/core';
import { PlaceTypes } from '../constants';
import { LngLatLike } from 'mapbox-gl';

@Injectable({ providedIn: 'root' })
export class ServiceLocation
{
    constructor
    (
        private mapbox:       ServiceMapbox,
        private bigdatacloud: ServiceBigDataCloud
    ) { }

    public static cityId(countryCode: string, region: string, city: string): string
    {
        countryCode = countryCode.trim().toLowerCase();
        region      = region.trim().toLowerCase().replace(' ', '-');
        city        = city.trim().toLowerCase().replace(' ', '-');

        return `${countryCode}_${region}_${city}`;
    }

    public static cityIdFromResponse(response: ResponseReverseGeocode): string
    {
        return ServiceLocation.cityId(response.countryCode, response.principalSubdivision, response.locality);
    }

    public static place(result: Result): Place
    {
        const address     : Array<string>      = result.place_name.split(', ');
        const context     : ContextItem        = result.context[0];
        const type        : MapboxPlaceType    = context.id.split('.')[0] as MapboxPlaceType;
        const text        : string             = result.title || context.text || result.text;
        const title       : string             = address[0];
        const description : string             = address[1];
        const center      : Array<number>      = result.center;
        const geopoint    : GeoPoint           = new GeoPoint(center[1], center[0]);
        const centerLike  : LngLatLike         = { lat: geopoint.latitude, lng: geopoint.longitude };

        return {
            center,
            centerLike,
            description,
            geopoint,
            text,
            title,
            type
        };
    }

    public static city(response: ResponseReverseGeocode): CityInfo
    {
        return {
            geopoint : new GeoPoint(response.latitude, response.longitude),
            id       : ServiceLocation.cityId(response.countryCode, response.principalSubdivision, response.locality),
            name     : response.locality,
            region   : response.principalSubdivision,
            country  : response.countryCode
        };
    }

    public cityInfo(response: ResponseReverseGeocode): Observable<CityInfo>
    {
        const city   : CityInfo = ServiceLocation.city(response);
        const search : string   = `${city.name} ${city.region}`;

        const options: ParamsForwardGeocode =
        {
            autocomplete: false,
            fuzzyMatch:   false,
            limit:        1,
            proximity:    [city.geopoint.longitude, city.geopoint.latitude],
            routing:      false,
            types:        [MapboxPlaceType.Place]
        };

        return this.mapbox.forwardGeocode(search, options).pipe
        (
            map((response: ResponseGeocode) =>
                response.features[0].center
            ),
            map((center: [number, number]) =>
                ({
                    ...city,

                    geopoint: new GeoPoint(center[1], center[0])
                })
            )
        );
    }

    public addCity(place: Place): Observable<Place>
    {
        const options: ParamsForwardGeocode =
        {
            autocomplete: false,
            fuzzyMatch:   false,
            limit:        1,
            proximity:    [place.geopoint.longitude, place.geopoint.latitude],
            routing:      false,
            types:        PlaceTypes.physical
        };

        const search: string = place.title || place.text;

        return this.mapbox.forwardGeocode(search, options).pipe
        (
            map((response: ResponseGeocode) =>
                response.features[0].center
            ),
            switchMap((center: [number, number]) =>
                this.bigdatacloud.reverseGeocode(center[1], center[0])
            ),
            map((response: ResponseReverseGeocode) =>
              ({
                  ...place,
                  city: ServiceLocation.city(response)
              })
            )
        );
    }

    public placeFromEvent(event: Event, language: string = 'en'): Observable<Place>
    {
        if (event == null)
        {
            return of(null);
        }

        const geopoint  : GeoPoint = event.geopoint;
        const latitude  : number             = geopoint.latitude;
        const longitude : number             = geopoint.longitude;

        const options: ParamsReverseGeocode =
        {
            language,
            limit       : 1,
            reverseMode : ReverseMode.Distance,
            routing     : false,
            types       : [event.placeType]
        };

        return this.mapbox.reverseGeocode(latitude, longitude, options).
        pipe
        (
            tap(r => console.log(r)),
            map((response: ResponseGeocode) =>
                ({
                    place_name: response.features[0].place_name,
                    center : [longitude, latitude],
                    context : response.features[0].context,
                } as Result)
            ),
            map((result: Result) =>
                ServiceLocation.place(result)
            )
        );
    }
}
