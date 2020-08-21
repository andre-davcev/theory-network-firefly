import { firestore } from 'firebase/app';
import { LngLatLike } from 'mapbox-gl';

import { CityInfo } from '../interfaces';
import { MapboxPlaceType } from '../enums';

export interface Place
{
    center      : Array<number>;
    centerLike  : LngLatLike;
    description : string;
    geopoint    : firestore.GeoPoint;
    text        : string;
    title       : string;
    type        : MapboxPlaceType;
    city?       : CityInfo;
}
