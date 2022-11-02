
import { DocumentSnapshot } from '@google-cloud/firestore';

import { FirebaseDocument } from '../interfaces';
import { Version } from '../enums';
import { serverTimestamp, FieldValue } from '@angular/fire/firestore';

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
        const timestamp : FieldValue = serverTimestamp();

        object.id          = id;
        object.dateCreated = timestamp;
        object.dateUpdated = timestamp;
        object.version     = version;
        object.metadata    = {};

        return object;
    }
}
