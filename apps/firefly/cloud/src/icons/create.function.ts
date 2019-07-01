import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const IconsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;
    const userId:   string    = snapshot.data().userId;

    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Icons
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        database.collection('user-icons').doc(userId).update({ [id]: id })
    ]);
});

export { IconsCreate };
