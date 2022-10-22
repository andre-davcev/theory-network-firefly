import { GeoPoint } from '../types';

export interface CityInfo
{
    id       : string;
    name     : string;
    country  : string;
    geopoint : GeoPoint;
    region   : string;
}
