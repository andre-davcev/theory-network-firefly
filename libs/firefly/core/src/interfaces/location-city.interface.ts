import { Location } from '../models';
import { firestore } from 'firebase/app';

export interface LocationCity
{
    geopoint : firestore.GeoPoint;
    city     : Location;
}
