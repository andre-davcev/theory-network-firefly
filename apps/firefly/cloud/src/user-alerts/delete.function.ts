import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UserAlertsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('user-alerts/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:         string                      = snapshot.id;
    const data:       Record<string, string>      = snapshot.data();
    const collection: CollectionReference         = database.collection('alerts');
    const promises:   Array<Promise<WriteResult>> = [];

    Object.keys(data).forEach((key: string) =>
        promises.push(collection.doc(key).delete())
    );

    return Promise.all(promises);
});

export { UserAlertsDelete };

