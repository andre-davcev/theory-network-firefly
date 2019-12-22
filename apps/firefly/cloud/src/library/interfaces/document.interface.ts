import { firestore } from 'firebase/app';

export interface FirebaseDocument
{
    dateCreated : firestore.FieldValue;
    dateUpdated : firestore.FieldValue;
    id          : string;
    userId      : string;
    version     : string;

    metadata?   : Record<string, any>;
}
