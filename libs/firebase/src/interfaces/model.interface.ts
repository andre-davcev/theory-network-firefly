import { firestore } from 'firebase/app';


export interface Model
{
    version?:     string;
    id?:          string;
    dateCreated?: firestore.Timestamp;
    dateUpdated?: firestore.Timestamp;
}
