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
    const promises:        Array<Promise<WriteResult>> = [];
    const collection:      CollectionReference         = database.collection('user-subscriptions');

    Object.keys(userSubscribers).forEach((userId: string) =>
        promises.push(collection.doc(userId).update({ [id]: FieldValue.delete() }))
    );

    return Promise.all(promises);
});

export { ClustersDelete };
