import { GeoPoint } from '@angular/fire/firestore';
import { LngLatLike } from 'mapbox-gl';

import { MapboxPlaceType } from '../enums';
import { CityInfo } from './city-info.interface';

export interface Place
{
    center      : Array<number>;
    centerLike  : LngLatLike;
    description : string;
    geopoint    : GeoPoint;
    text        : string;
    title       : string;
    type        : MapboxPlaceType;
    city?       : CityInfo;
}
