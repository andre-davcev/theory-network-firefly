import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ClusterEventsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('cluster-events/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:         string                      = snapshot.id;
    const data:       Record<string, string>      = snapshot.data();
    const collection: CollectionReference         = database.collection('event-clusters');
    const promises:   Array<Promise<WriteResult>> = [];

    Object.keys(data).forEach((key: string) =>
        promises.push(collection.doc(key).update({ [id]: FieldValue.delete() }))
    );

    return Promise.all(promises);
});

export { ClusterEventsDelete };
