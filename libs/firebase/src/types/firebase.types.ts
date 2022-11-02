import * as firebase from 'firebase/compat';
import { firestore } from 'firebase-admin';

export class GeoPoint  extends firestore.GeoPoint {};

export class Timestamp extends firebase.default.firestore.Timestamp {};

export type DocumentSnapshot      = firebase.default.firestore.DocumentSnapshot;
export type QuerySnapshot         = firebase.default.firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firebase.default.firestore.QueryDocumentSnapshot;

export type UserCredential = firebase.default.auth.UserCredential;


