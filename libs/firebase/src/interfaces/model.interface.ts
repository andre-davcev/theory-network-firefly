import { firestore } from 'firebase/app';

export interface Model
{
    id?: string;
    v?: string;
    dateCreated?: firestore.Timestamp;
    dateUpdated?: firestore.Timestamp;
}
