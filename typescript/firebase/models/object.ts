import * as firebase from 'firebase/app';

export interface FirestoreObject
{
    dateCreated? : firebase.firestore.FieldValue;
    dateUpdated? : firebase.firestore.FieldValue;
}