import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UserClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('user-clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const data:       Record<string, string>      = snapshot.data();
    const collection: CollectionReference         = database.collection('clusters');
    const promises:   Array<Promise<WriteResult>> = [];

    Object.keys(data).forEach((key: string) =>
        promises.push(collection.doc(key).delete())
    );

    return Promise.all(promises);
});

export { UserClustersDelete };

