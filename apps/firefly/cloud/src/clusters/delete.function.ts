import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, QuerySnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id: string = snapshot.id;

    const queries: Array<Promise<QuerySnapshot>> =
    [
        database.collection('events').where('clusters',        'array-contains', id).get(),
        database.collection('users').where('subscriptionList', 'array-contains', id).get()
    ];
    const updates: Array<Promise<WriteResult>> = [];

    const query: Array<QuerySnapshot> = await Promise.all(queries);

    const events: Array<QueryDocumentSnapshot> = query[0].docs;
    const users:  Array<QueryDocumentSnapshot> = query[1].docs;

    events.forEach((snapshot: QueryDocumentSnapshot) =>
        updates.push(snapshot.ref.update({ clusters: FieldValue.arrayRemove(id)}))
    );

    users.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        const subscriptions: Record<string, any> = snapshot.data().subscriptions;

        delete subscriptions[id];

        updates.push(snapshot.ref.update
        ({
            subscriptionList : FieldValue.arrayRemove(id),
            streams          : FieldValue.arrayRemove(id),

            subscriptions
        }))
    });

    return Promise.all(updates);
});

export { ClustersDelete };
