import * as firebase from 'firebase/app';

export interface TNObjectFirestore
{
    dateCreated? : firebase.firestore.FieldValue;
    dateUpdated? : firebase.firestore.FieldValue;
}