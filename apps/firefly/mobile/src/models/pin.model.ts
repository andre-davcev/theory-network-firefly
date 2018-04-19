import * as firebase from 'firebase';

export interface Pin
{
    geopoint: firebase.firestore.GeoPoint;
}