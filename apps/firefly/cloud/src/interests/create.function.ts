import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, Interest, Collection } from '../library';

const database: Firestore = db();

const InterestsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Interests}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Interest = ServiceFirestore.create<Interest>(snapshot, Version.Interests);

    return snapshot.ref.update(object);
});

export { InterestsCreate };
