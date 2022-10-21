import { Injectable, Inject } from '@angular/core';
import { MapboxEndpoint } from '../enums';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ParamsForwardGeocode, ParamsReverseGeocode } from '../api';
import { EnvironmentMapbox } from '../interfaces';
import { MapboxEnvironment } from '@firefly/shared/environment';
import { ResponseGeocode } from '../responses';

@Injectable({ providedIn: 'root' })
export class ServiceMapbox
{
    private api: string = 'https://api.mapbox.com/geocoding/v5';

    constructor
    (
        private http: HttpClient,
        @Inject(MapboxEnvironment) private environment: EnvironmentMapbox
    ) { }

    /**
     * Forward Geocode
     *    /geocoding/v5/{endpoint}/{search_text}.json
     *
     * @param endpoint
     * @param searchText
     */
    public forwardGeocode(searchText: string, options?: ParamsForwardGeocode, endpoint: MapboxEndpoint = MapboxEndpoint.Places): Observable<ResponseGeocode>
    {
        searchText = new HttpParams().set('searchText', searchText).toString().split('=')[1];

        const url: string = `${this.api}/${endpoint}/${searchText}.json`;

        let params: HttpParams = new HttpParams().set('access_token', this.environment.accessToken);

        Object.keys(options).forEach((param: string) =>
            params = params.set(param, Array.isArray(options[param]) ? options[param].join(',') : `${options[param]}`)
        );

        return this.http.get<ResponseGeocode>(url, { params });
    }

    /**
     * Reverse Geocode
     *     /geocoding/v5/{endpoint}/{longitude},{latitude}.json
     */
    public reverseGeocode(latitude: number, longitude: number, options?: ParamsReverseGeocode, endpoint: MapboxEndpoint = MapboxEndpoint.Places): Observable<ResponseGeocode>
    {
      const url: string = `${this.api}/${endpoint}/${longitude},${latitude}.json`;

      let params: HttpParams = new HttpParams().set('access_token', this.environment.accessToken);

      Object.keys(options).forEach((param: string) =>
          params = params.set(param, Array.isArray(options[param]) ? options[param].join(',') : `${options[param]}`)
      );

      return this.http.get<ResponseGeocode>(url, { params });
    }
}
