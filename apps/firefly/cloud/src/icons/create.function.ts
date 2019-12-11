import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const database: Firestore = db();

const IconsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Icons
    });

    return Promise.all
    ([
        snapshot.ref.update(object)
    ]);
});

export { IconsCreate };
