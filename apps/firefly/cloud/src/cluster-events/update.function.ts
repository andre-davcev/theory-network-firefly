import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore } from '@google-cloud/firestore';
import { Status, ServiceFirestore, ForeignKeyChange } from '../library';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ClusterEventsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('cluster-events/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string                 = change.after.id;
    const before: Record<string, string> = change.before.data();
    const after:  Record<string, string> = change.after.data();

    const collection: CollectionReference = database.collection('event-clusters');

    const status: Status             = ServiceFirestore.mapStatus(before, after);
    const fkChange: ForeignKeyChange = ServiceFirestore.mapChange(before, after);

    let promise: Promise<any> = Promise.resolve();

    if (status === Status.Added)
    {
        promise = collection.doc(fkChange.key).update({ [id]: id });
    }
    else if (status === Status.Removed)
    {
        promise = collection.doc(fkChange.key).update({ [id]: FieldValue.delete() })
    }

    return promise;
});

export { ClusterEventsUpdate };
