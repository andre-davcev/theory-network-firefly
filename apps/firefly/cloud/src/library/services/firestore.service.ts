import { firestore } from 'firebase-admin';

export class ServiceFirestore
{
    public static clone(object: Record<string, any>): Record<string, any>
    {
        return JSON.parse(JSON.stringify(object));
    }

    public static create(id: string, object: Record<string, any> = {}): Record<string, any>
    {
        const timestamp: firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        return {
            ...object,

            id,
            dateCreated: timestamp,
            dateUpdated: timestamp
        };
    }
}
