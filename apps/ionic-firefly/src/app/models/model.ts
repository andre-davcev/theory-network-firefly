import * as firebase from 'firebase/app';

export interface Model
{
    id?: string;
    v?: string;
    dateCreated?: firebase.firestore.Timestamp;
    dateUpdated?: firebase.firestore.Timestamp;
}
