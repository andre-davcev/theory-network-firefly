import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const UserSubscriptionsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('user-subscriptions/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const subscriber: Record<string, FieldValue> = { [id]: FieldValue.delete() };

    return Promise.all
    ([
        database.collection('cluster-subscribers').doc(id).update(subscriber)
    ]);
});

export { UserSubscriptionsDelete };
