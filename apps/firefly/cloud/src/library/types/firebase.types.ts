import { firestore } from 'firebase-admin';
import * as firebase from 'firebase/app';

export class GeoPoint  extends firestore.GeoPoint  {};
export class Timestamp extends firestore.Timestamp {};

export type FieldValue            = firestore.FieldValue;
export type FirebaseError         = firebase.default.FirebaseError;
export type DocumentSnapshot      = firestore.DocumentSnapshot;
export type QuerySnapshot         = firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
export type FirebaseUser          = firebase.default.User;
export type UserCredential        = firebase.default.auth.UserCredential;

export function serverTimestamp()    { return firestore.FieldValue.serverTimestamp() }
export function fromDate(date: Date) { return firestore.Timestamp.fromDate(date); }
