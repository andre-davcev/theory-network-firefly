import * as firebase from 'firebase/compat';

export type DocumentSnapshot<T> =
  firebase.default.firestore.DocumentSnapshot<T>;
export type QuerySnapshot = firebase.default.firestore.QuerySnapshot;
export type QueryDocumentSnapshot =
  firebase.default.firestore.QueryDocumentSnapshot;

export type User = firebase.default.User;
export type UserCredential = firebase.default.auth.UserCredential;
