import { Injectable, Inject } from '@angular/core';
import { MapboxEndpoint } from '../enums';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ParamsForwardGeocode } from '../api';

@Injectable({ providedIn: 'root' })
export class ServiceMapbox
{
    private api: string = 'https://api.mapbox.com/geocoding/v5';

    constructor
    (
        private http: HttpClient,
        // @Inject('MapboxEnvironment') private environment: EnvironmentMapbox
    ) { }

    /**
     * Forward Geocode
     *    /geocoding/v5/{endpoint}/{search_text}.json
     *
     * @param endpoint
     * @param searchText
     */
    public forwardGeocode(searchText: string, options?: ParamsForwardGeocode, endpoint: MapboxEndpoint = MapboxEndpoint.Places): Observable<any>
    {
        searchText = new HttpParams().set('searchText', searchText).toString().split('=')[1];

        const url: string = `${this.api}/${endpoint}/${searchText}.json`;

        // const params: HttpParams = new HttpParams().set('access_token', this.environment.accessToken);
        let params: HttpParams = new HttpParams().set('access_token', 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg');

        Object.keys(options).forEach((param: string) =>
            params = params.set(param, Array.isArray(options[param]) ? options[param].join(',') : `${options[param]}`)
        );

        return this.http.get<any>(url, { params });
    }
}
