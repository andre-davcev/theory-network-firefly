import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { stringify } from 'querystring';

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

    const collection: CollectionReference       = database.collection('icon-clusters');
    const promises: Array<Promise<WriteResult>> = [];

    if (before[key] == null && after[key] != null)
    {
        promises.push(collection.doc(after[key]).update({ [id]: id }));
    }
    else if (before[key] != null && after[key] == null)
    {
        promises.push(collection.doc(before[key]).update({ [id]: FieldValue.delete() }));
    }

    const refTable: Record<string, any> = { sort: {} };

    ['name', 'dateCreated'].
    filter((key: string) => before[key] !== after[key]).
    forEach((key: string) =>
        refTable.sort[key] = after[key]
    );

    if (Object.keys(refTable.sort).length > 0)
    {
        promises.push(database.collection('user-clusters').doc(after.userId).update({ [id]: refTable }));
    }

    return Promise.all(promises);
});

export { ClustersUpdate };
