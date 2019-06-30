import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onCreate(async (snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const data: Record<string, any> = snapshot.data();

    const model: any = ServiceFirestore.create(snapshot);

    const user:              any = { ...model, version: Version.Users };
    const userAlerts:        any = { ...model, version: Version.UserAlerts, unread: [], read: [], deleted: [] };
    const userClusters:      any = { ...model, version: Version.UserClusters, data: {} };
    const userEvents:        any = { ...model, version: Version.UserEvents, data: {} };
    const userImages:        any = { ...model, version: Version.UserImages, data: {} };
    const userIcons:         any = { ...model, version: Version.UserIcons, data: {} };
    const userStreams:       any = { ...model, version: Version.UserStreams, data: [] };
    const userSubscriptions: any = { ...model, version: Version.UserSubscriptions, on: {}, off: {} };

    await Promise.all
    ([
        snapshot.ref.update(user),
        database.collection('user-alerts').doc(id).create(userAlerts),
        database.collection('user-clusters').doc(id).create(userClusters),
        database.collection('user-events').doc(id).create(userEvents),
        database.collection('user-images').doc(id).create(userImages),
        database.collection('user-icons').doc(id).create(userIcons),
        database.collection('user-stream').doc(id).create(userStreams),
        database.collection('user-subscriptions').doc(id).create(userSubscriptions)
    ]);

    return database.collection('clusters').add
    ({
        name        : 'Your first cluster!',
        description : `This is your first cluster. When you're ready to publish to the global catalog, flip off the private switch and join the Firefly community of publishers!`,
        private     : true,
        userId      : id,
        draft       : false,
        tagline     : 'Come enjoy my first event cluster',
        iconId      : 'admin-icons-default.png',
        events      : {},
        subscribers : {}
    });
});

export { UsersCreate };
