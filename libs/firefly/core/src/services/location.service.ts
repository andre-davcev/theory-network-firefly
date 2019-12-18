import { ServiceMapbox, ContextItem, MapboxPlaceType, ParamsForwardGeocode, ResponseGeocode } from '@theory/mapbox';
import { ServiceBigDataCloud, ResponseReverseGeocode } from '@theory/bigdatacloud';

import { Observable } from 'rxjs';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

import { LocationCity } from '../interfaces';
import { Location } from '@firefly/cloud';
import { Injectable } from '@angular/core';

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
        city        = region.trim().toLowerCase().replace(' ', '-');

        return `${countryCode}_${region}_${city}`;
    }

    public getLocationCity(result: Result): Observable<LocationCity>
    {
        const contextItem: ContextItem = result.
            context.
            find((item: ContextItem) =>
                item.id.split('.')[0] === MapboxPlaceType.Place
            );

        const center:   [number, number]   = [result.center[0], result.center[1]];
        const geopoint: firestore.GeoPoint = new firestore.GeoPoint(center[1], center[0]);

        const options: ParamsForwardGeocode =
        {
            autocomplete: false,
            fuzzyMatch:   false,
            limit:        1,
            proximity:    center,
            routing:      false,
            types:        [MapboxPlaceType.Place]
        };

        return this.mapbox.forwardGeocode(contextItem.text, options).pipe
        (
            map((response: ResponseGeocode) =>
                response.features[0].center
            ),
            switchMap((center: [number, number]) =>
                this.bigdatacloud.reverseGeocode(center[1], center[0])
            ),
            map((response: ResponseReverseGeocode) =>
                ({
                    geopoint : new firestore.GeoPoint(response.latitude, response.longitude),
                    cityId   : ServiceLocation.cityId(response.countryCode, response.principalSubdivision, response.locality),
                    city     : response.locality,
                    region   : response.principalSubdivision,
                    country  : response.countryCode
                })
            ),
            map((city: Location) =>
                ({
                    geopoint,
                    city
                })
            )
        );
    }
}
