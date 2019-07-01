import { firestore } from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { QuerySnapshot, Firestore, WriteResult } from '@google-cloud/firestore';

export class ServiceFirestore
{
    public static clone(object: Record<string, any>): Record<string, any>
    {
        return JSON.parse(JSON.stringify(object));
    }

    public static create(snapshot: DocumentSnapshot, object: Record<string, any> = {}): Record<string, any>
    {
        const id:        string               = snapshot.id;
        const timestamp: firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        return {
            ...object,

            id,
            dateCreated: timestamp,
            dateUpdated: timestamp
        };
    }
}
