import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const ClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;
    const userId:   string    = snapshot.data().userId;

    await database.collection('user-clusters').doc(userId).update({ [id]: FieldValue.delete() });

    const subscribers: DocumentSnapshot = await database.collection('cluster-subscribers').doc(id).get();

    const userSubscribers: Record<string, string>      = subscribers.data();
    const collection:      CollectionReference         = database.collection('user-subscriptions');

    const promises: Array<Promise<WriteResult>> =
    [
        database.collection('cluster-subscribers').doc(id).delete(),
        database.collection('cluster-events').doc(id).delete()
    ];

    const keys: Array<string> = userSubscribers == null ? [] : Object.keys(userSubscribers);

    keys.forEach((userId: string) =>
        promises.push(collection.doc(userId).update({ [id]: FieldValue.delete() }))
    );

    return Promise.all(promises);
});

export { ClustersDelete };
