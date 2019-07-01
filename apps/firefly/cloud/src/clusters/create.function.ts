import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore } from '../library';

const ClustersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;
    const userId:   string    = snapshot.data().userId;

    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Clusters
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        database.collection('cluster-subscribers').doc(id).create({}),
        database.collection('user-clusters').doc(userId).update({ [id]: id })
    ]);
});

export { ClustersCreate };
