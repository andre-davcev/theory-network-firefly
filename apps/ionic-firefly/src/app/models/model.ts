import { FirestoreTimestamp } from '../types/firestore-timestamp.type';

export interface Model
{
    id?: string;
    v?: string;
    dateCreated?: FirestoreTimestamp;
    dateUpdated?: FirestoreTimestamp;
}
