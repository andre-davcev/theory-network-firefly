import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ClustersUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('clusters/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string              = change.after.id;
    const key:    string              = 'iconId';
    const before: Record<string, any> = change.before.data();
    const after:  Record<string, any> = change.after.data();

    const collection: CollectionReference = database.collection('icon-clusters');

    let promise: Promise<any> = Promise.resolve();

    if (before[key] == null && after[key] != null)
    {
        promise = collection.doc(after[key]).update({ [id]: id });
    }
    else if (before[key] != null && after[key] == null)
    {
        promise = collection.doc(before[key]).update({ [id]: FieldValue.delete() })
    }

    return promise;
});

export { ClustersUpdate };
