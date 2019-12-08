import { firestore } from 'firebase/app';

export interface Location
{
    geopoint:  firestore.GeoPoint
    city:      string;
    region:    string;
    country:   string;
}
