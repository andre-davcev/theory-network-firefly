import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const EventsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('events/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string              = change.after.id;
    const key:    string              = 'imageId';
    const before: Record<string, any> = change.before.data();
    const after:  Record<string, any> = change.after.data();

    const collection: CollectionReference         = database.collection('image-events');
    const promises:   Array<Promise<WriteResult>> = [];

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
        promises.push(database.collection('user-events').doc(after.userId).update({ [id]: refTable }));
    }

    return promises;
});

export { EventsUpdate };
