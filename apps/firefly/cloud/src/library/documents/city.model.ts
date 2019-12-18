import { firestore } from 'firebase/app';
import { FirebaseDocument } from '../interfaces';

export interface City extends FirebaseDocument
{
    geopoint: firestore.GeoPoint
    city:     string;
    region:   string;
    country:  string;
    nearby:   Record<string, number>;
}
