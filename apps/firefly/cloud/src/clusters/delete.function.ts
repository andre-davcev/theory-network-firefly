import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:       string              = snapshot.id;
    const data:     Record<string, any> = snapshot.data();

    return Promise.all
    ([
        database.collection('cluster-subscribers').doc(id).delete()
    ]);
});

export { ClustersDelete };
