import { firestore } from 'firebase/app';

export interface Pin
{
    geopoint: firestore.GeoPoint;
}
