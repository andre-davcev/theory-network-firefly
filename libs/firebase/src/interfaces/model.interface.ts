import { firestore } from 'firebase';


export interface Model
{
    version?:     string;
    id?:          string;
    dateCreated?: firestore.FieldValue;
    dateUpdated?: firestore.FieldValue;
}
