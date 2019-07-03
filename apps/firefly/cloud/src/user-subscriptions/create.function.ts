import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const UserSubscriptionsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('user-subscriptions/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const subscriber: Record<string, string> = { [id]: id };

    return Promise.all
    ([
        database.collection('cluster-subscribers').doc(id).update(subscriber)
    ]);
});

export { UserSubscriptionsCreate };
