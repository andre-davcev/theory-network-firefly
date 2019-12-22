import { firestore } from 'firebase/app';
import { FirebaseDocument } from '../interfaces';

export interface City extends FirebaseDocument
{
    city:     string;
    country:  string;
    geopoint: firestore.GeoPoint;
    nearby:   Record<string, number>;
    region:   string;
}
