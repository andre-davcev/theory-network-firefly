import { GeoPoint } from '@theory/firebase';

export interface CityInfo
{
    id       : string;
    name     : string;
    country  : string;
    geopoint : GeoPoint;
    region   : string;
}
