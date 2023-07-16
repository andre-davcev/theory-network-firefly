import { GeoPoint } from 'firebase/firestore';

import { MapboxPlaceType } from '../enums';
import { CityInfo } from './city-info.interface';

export interface Place {
  center: [number, number];
  centerLike:
    | [number, number]
    | { lng: number; lat: number }
    | { lon: number; lat: number };
  description: string;
  geopoint: GeoPoint;
  text: string;
  title: string;
  type: MapboxPlaceType;
  city?: CityInfo;
}
