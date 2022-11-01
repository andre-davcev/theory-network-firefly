import { firestore } from 'firebase-admin';
import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';

export class GeoPoint  extends firestore.GeoPoint  {};
export class Timestamp extends firestore.Timestamp {};

export type FieldValue            = firestore.FieldValue;
export type FirebaseError         = firebase.FirebaseError;
export type DocumentSnapshot      = firestore.DocumentSnapshot;
export type QuerySnapshot         = firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
export type FirebaseUser          = firebaseAuth.User;
export type UserCredential        = firebaseAuth.UserCredential;

export function serverTimestamp()    { return firestore.FieldValue.serverTimestamp() }
export function fromDate(date: Date) { return firestore.Timestamp.fromDate(date); }
