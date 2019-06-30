import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const data: Record<string, any> = snapshot.data();

    const model: any = ServiceFirestore.create(id);

    const user:              any = { ...model, version: Version.Users };
    const userAlerts:        any = { ...model, version: Version.UserAlerts, unread: [], read: [], deleted: [] };
    const userClusters:      any = { ...model, version: Version.UserClusters, data: {} };
    const userStreams:       any = { ...model, version: Version.UserStreams, data: [] };
    const userSubscriptions: any = { ...model, version: Version.UserSubscriptions, on: {}, off: {} };

    return Promise.all
    ([
        snapshot.ref.update(user),
        database.collection('user-alerts').doc(id).create(userAlerts),
        database.collection('user-clusters').doc(id).create(userClusters),
        database.collection('user-stream').doc(id).create(userStreams),
        database.collection('user-subscriptions').doc(id).create(userSubscriptions)
    ]);
});

export { UsersCreate };
