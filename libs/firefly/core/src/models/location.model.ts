import { firestore } from 'firebase/app';

export interface Location
{
    geopoint:  firestore.GeoPoint
    cityId:    string;
    city:      string;
    region:    string;
    country:   string;
}
