import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const EventClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('event-clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:         string                      = snapshot.id;
    const data:       Record<string, string>      = snapshot.data();
    const collection: CollectionReference         = database.collection('cluster-events');
    const promises:   Array<Promise<WriteResult>> = [];

    Object.keys(data).forEach((key: string) =>
        promises.push(collection.doc(key).update({ [id]: FieldValue.delete() }))
    );

    return Promise.all(promises);
});

export { EventClustersDelete };
