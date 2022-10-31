import * as firebase from 'firebase/compat';
import { firestore } from 'firebase-admin';

export class GeoPoint  extends firestore.GeoPoint {};

export type DocumentSnapshot = firebase.default.firestore.DocumentSnapshot;
