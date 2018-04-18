import { FirestoreTimestamp } from "./firestore-timestamp";

export interface Model
{
    id?: string;
    v?: string;
    dateCreated?: FirestoreTimestamp;
    dateUpdated?: FirestoreTimestamp;
}