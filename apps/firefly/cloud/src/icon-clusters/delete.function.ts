import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const IconClustersDelete : CloudFunction<DocumentSnapshot> =

firestore.
document('icon-clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const data:       Record<string, string>      = snapshot.data();
    const collection: CollectionReference         = database.collection('clusters');
    const promises:   Array<Promise<WriteResult>> = [];

    Object.keys(data).forEach((key: string) =>
        promises.push(collection.doc(key).update({ iconId: FieldValue.delete() }))
    );

    return Promise.all(promises);
});

export { IconClustersDelete };
