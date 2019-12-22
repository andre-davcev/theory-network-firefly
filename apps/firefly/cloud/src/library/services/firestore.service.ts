import { firestore } from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { FirebaseDocument } from '../interfaces';
import { Version } from '../enums';

export class ServiceFirestore
{
    public static clone(object: Record<string, any>): Record<string, any>
    {
        return JSON.parse(JSON.stringify(object));
    }

    public static create<T extends FirebaseDocument>(snapshot: DocumentSnapshot, version: Version): T
    {
        const id        : string               = snapshot.id;
        const object    : T                    = snapshot.data() as T;
        const timestamp : firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        object.id          = id;
        object.dateCreated = timestamp;
        object.dateUpdated = timestamp;

        return object;
    }
}
