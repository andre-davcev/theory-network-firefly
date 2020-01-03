import { Location } from '@firefly/cloud';
import { firestore } from 'firebase/app';

export interface LocationCity
{
    geopoint : firestore.GeoPoint;
    cityId   : string;
    city     : Location;
}
