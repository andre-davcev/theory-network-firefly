import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponseReverseGeocode } from '../responses';

@Injectable({ providedIn: 'root' })
export class ServiceBigDataCloud {
  private api: string = 'https://api.bigdatacloud.net/data';

  constructor(private http: HttpClient) {}

  public reverseGeocode(
    latitude: number,
    longitude: number,
    localityLanguage: string = 'en'
  ): Observable<ResponseReverseGeocode> {
    const url: string = `${this.api}/reverse-geocode-client`;

    const params: HttpParams = new HttpParams()
      .set('latitude', `${latitude}`)
      .set('longitude', `${longitude}`)
      .set('localityLanguage', `${localityLanguage}`);

    return this.http.get<ResponseReverseGeocode>(url, { params });
  }
}
