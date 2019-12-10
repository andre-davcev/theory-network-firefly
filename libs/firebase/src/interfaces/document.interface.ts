import { firestore } from 'firebase';


export interface FirebaseDocument
{
    version     : string;
    id          : string;
    userId      : string;
    dateCreated : firestore.FieldValue;
    dateUpdated : firestore.FieldValue;
    metadata?   : Record<string, any>;
}
