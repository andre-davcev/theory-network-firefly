import { firestore } from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export class ServiceFirestore
{
    public static clone(object: Record<string, any>): Record<string, any>
    {
        return JSON.parse(JSON.stringify(object));
    }

    public static create<T>(snapshot: DocumentSnapshot, object: Partial<T>): T
    {
        const id:        string               = snapshot.id;
        const timestamp: firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        return {
            ...object as T,

            id,
            dateCreated: timestamp,
            dateUpdated: timestamp
        };
    }
}
