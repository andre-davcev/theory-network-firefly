import { firestore } from 'firebase/app';
import { FirebaseDocument } from '@theory/firebase';
import { ClusterCity } from '../models';

export interface City extends FirebaseDocument
{
    // id: {country}_{region}_{city}
    geopoint:  firestore.GeoPoint
    city:      string;
    region:    string;
    country:   string;

    nearby:   Record<string, number>;       // cityId:    distance (km)
    clusters: Record<string, ClusterCity>;  // clusterId: ClusterCity
}
