import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore } from '../library';

const database: Firestore = db();

const CitiesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('cities/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Cities
    });

    return snapshot.ref.update(object);
});

export { CitiesCreate };

