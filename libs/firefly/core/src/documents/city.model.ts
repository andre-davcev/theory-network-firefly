import { firestore } from 'firebase/app';
import { FirebaseDocument } from '@theory/firebase';

export interface City extends FirebaseDocument
{
    geopoint:  firestore.GeoPoint
    city:      string;
    region:    string;
    country:   string;

    nearby:         Record<string, number>;
    clustersEvents: Record<string, number>;
    clusterList:    Array<string>;
}
