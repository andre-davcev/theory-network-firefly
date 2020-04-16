import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, Interest, Collection } from '../library';

const database: Firestore = db();

const ClustersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`clusters/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Interest = ServiceFirestore.create<Interest>(snapshot, Version.Interests);

    return snapshot.ref.update(object);
});

export { ClustersCreate };
