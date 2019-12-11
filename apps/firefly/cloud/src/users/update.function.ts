import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore, WriteResult } from '@google-cloud/firestore';
import { Status, ServiceFirestore, ForeignKeyChange } from '../library';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UserSubscriptionsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('user-subscriptions/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string                  = change.after.id;
    const before: Record<string, boolean> = change.before.data();
    const after:  Record<string, boolean> = change.after.data();

    const collection: CollectionReference = database.collection('cluster-subscribers');

    const status:   Status           = ServiceFirestore.mapStatus(before, after);
    const fkChange: ForeignKeyChange = ServiceFirestore.mapChange(before, after);

    let promise: Promise<WriteResult>;

    if ((status === Status.Added   && fkChange.after) ||
        (status === Status.Changed && fkChange.after))
    {
        promise = collection.doc(fkChange.key).update({ [id]: id });
    }
    else if ((status === Status.Removed && fkChange.before) ||
             (status === Status.Changed && !fkChange.after))
    {
        promise = collection.doc(fkChange.key).update({ [id]: FieldValue.delete() })
    }

    return promise;
});

export { UserSubscriptionsUpdate };
