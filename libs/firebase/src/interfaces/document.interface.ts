import { firestore } from 'firebase';


export interface Document
{
    version     : string;
    id          : string;
    dateCreated : firestore.FieldValue;
    dateUpdated : firestore.FieldValue;
    metadata?   : Record<string, any>;
}
