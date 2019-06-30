import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore } from '../library';

const ClustersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const object: Record<string, any> =
    {
        ...ServiceFirestore.create(snapshot),

        version: Version.Clusters,
        id:      snapshot.id
    };

    return Promise.all
    ([
        snapshot.ref.update(object),
        ServiceFirestore.foreignKeyAlter(snapshot, database, 'user-clusters', 'data')
    ]);
});

export { ClustersCreate };
