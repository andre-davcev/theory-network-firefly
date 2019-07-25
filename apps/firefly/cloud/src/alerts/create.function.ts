import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore } from '../library';

const database: Firestore = db();

const AlertsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('alerts/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:     string = snapshot.id;
    const userId: string = snapshot.data().userId;

    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Clusters
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        database.collection('user-alerts').doc(userId).update({ [id]: id })
    ]);
});

export { AlertsCreate };

