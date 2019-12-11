import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore } from '../library';

const database: Firestore = db();

const ClustersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onCreate(async(snapshot: DocumentSnapshot, ontext: EventContext) =>
{
    const id: string = snapshot.id;

    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Clusters
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        database.collection('cluster-subscribers').doc(id).create({})
    ]);
});

export { ClustersCreate };
