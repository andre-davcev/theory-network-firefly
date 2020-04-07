import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, Alert, Collection } from '../library';

const database: Firestore = db();

const AlertsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Alerts}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Alert = ServiceFirestore.create<Alert>(snapshot, Version.Interests);

    return snapshot.ref.update(object);
});

export { AlertsCreate };
