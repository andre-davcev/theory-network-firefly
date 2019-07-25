import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore, WriteResult } from '@google-cloud/firestore';
import { Status, ServiceFirestore, ForeignKeyChange } from '../library';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UserAlertsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('user-alerts/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string                  = change.after.id;
    const before: Record<string, boolean> = change.before.data();
    const after:  Record<string, boolean> = change.after.data();

    const collection: CollectionReference = database.collection('alerts');

    const status:   Status           = ServiceFirestore.mapStatus(before, after);
    const fkChange: ForeignKeyChange = ServiceFirestore.mapChange(before, after);

    let promise: Promise<WriteResult>;

    if (status === Status.Removed)
    {
        promise = collection.doc(fkChange.key).delete();
    }

    return promise;
});

export { UserAlertsUpdate };

