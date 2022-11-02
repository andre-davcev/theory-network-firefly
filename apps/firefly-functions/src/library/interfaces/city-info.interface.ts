import { GeoPoint } from '@angular/fire/firestore';

export interface CityInfo
{
    id       : string;
    name     : string;
    country  : string;
    geopoint : GeoPoint;
    region   : string;
}
