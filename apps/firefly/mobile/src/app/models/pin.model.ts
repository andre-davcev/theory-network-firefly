import * as firebase from 'firebase/app';

export interface Pin
{
    geopoint: firebase.firestore.GeoPoint;
}