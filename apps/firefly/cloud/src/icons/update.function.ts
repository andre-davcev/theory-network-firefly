import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const IconsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('icons/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string              = change.after.id;
    const before: Record<string, any> = change.before.data();
    const after:  Record<string, any> = change.after.data();

    const promises: Array<Promise<WriteResult>> = [];
    const refTable: Record<string, any>         = { sort: {} };

    ['name', 'dateCreated'].
    filter((key: string) => before[key] !== after[key]).
    forEach((key: string) =>
        refTable.sort[key] = after[key]
    );

    if (Object.keys(refTable.sort).length > 0)
    {
        promises.push(database.collection('user-icons').doc(after.userId).update({ [id]: refTable }));
    }

    return promises;
});

export { IconsUpdate };
