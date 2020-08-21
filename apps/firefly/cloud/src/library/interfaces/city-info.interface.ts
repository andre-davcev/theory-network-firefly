import { firestore } from 'firebase/app';

export interface CityInfo
{
    id       : string;
    name     : string;
    country  : string;
    geopoint : firestore.GeoPoint;
    region   : string;
}
