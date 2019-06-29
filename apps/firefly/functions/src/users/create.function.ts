import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore } from '../util';

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const data: Record<string, any> = snapshot.data();

    const model: any = ServiceFirestore.create(id);

    const userAlerts:        any = { ...model, version: '1.0.0', unread: [], read: [], deleted: [] };
    const userClusters:      any = { ...model, version: '1.0.0', data: {} };
    const userStream:        any = { ...model, version: '1.0.0', data: [] };
    const userSubscriptions: any = { ...model, version: '1.0.0', on: {}, off: {} };

    return Promise.all
    ([
        database.collection('user-alerts').doc(id).create(userAlerts),
        database.collection('user-clusters').doc(id).create(userClusters),
        database.collection('user-stream').doc(id).create(userStream),
        database.collection('user-subscriptions').doc(id).create(userSubscriptions)
    ]);
});

export { UsersCreate };
