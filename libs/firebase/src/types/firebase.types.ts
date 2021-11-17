import * as firebase from 'firebase';


export class GeoPoint  extends firebase.default.firestore.GeoPoint  {};
export class Timestamp extends firebase.default.firestore.Timestamp {};

export type FieldValue            = firebase.default.firestore.FieldValue;
export type FirebaseError         = firebase.default.FirebaseError;
export type DocumentSnapshot      = firebase.default.firestore.DocumentSnapshot;
export type QuerySnapshot         = firebase.default.firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firebase.default.firestore.QueryDocumentSnapshot;
export type User                  = firebase.default.User;
export type UserCredential        = firebase.default.auth.UserCredential;

export function serverTimestamp()    { return firebase.default.firestore.FieldValue.serverTimestamp() }
export function fromDate(date: Date) { return firebase.default.firestore.Timestamp.fromDate(date);    }
