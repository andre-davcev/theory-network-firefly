import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, DocumentReference, WriteResult, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, Cluster, Alert, UserProfile } from '../library';
import { User } from 'firebase';

const database: Firestore = db();

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onCreate(async (snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id   : string = snapshot.id;
    const user : User   = ServiceFirestore.create<User>(snapshot, { version: Version.Users } as Partial<User>);

    const documentCluster : DocumentReference = database.collection('clusters').doc();
    const documentAlert   : DocumentReference = database.collection('alerts').doc();

    const cluster: Partial<Cluster> =
    {
        userId : id,

        name            : 'Your first cluster!',
        tagline         : 'Come enjoy my first event cluster',
        description     : `This is your first cluster. When you're ready to publish to the global catalog, flip off the private switch and join the Firefly community of publishers!`,
        bucketPath      : 'baLysAd71cRyZjh0hr6poxR8an13_icons_CASwQmcg46JQYZqGmC3e.png',
        private         : true,
        subscriberCount : 0
    };

    const alert: Partial<Alert> =
    {
        userId : id,

        name        : 'Your first alert!',
        description : `This is your first alert. Once you subscribe to Firefly Clusters found on the home Discover screen, you will receive alerts when new events are posted in each cluster!`,
        bucketPath  : 'baLysAd71cRyZjh0hr6poxR8an13/images/nA8wxI4UIhEU0YjfwWPe.jpeg',
        eventId     : null, // ToDo: Add default eventId here
        clusterId   : documentCluster.id,
        dateTime    : FieldValue.serverTimestamp(),
        read        : false,
        tokens      : [],
        url         : 'https://firefly.im'
    };

    const userProfile: Partial<UserProfile> =
    {
        userId: id,

        nameFirst   : '',
        nameLast    : '',
        bucketPath  : '',
        companyName : '',
        isCompany   : false
    };

    return Promise.all
    ([
        snapshot.ref.update(user),
        database.collection('user-profiles').doc(id).create(userProfile),
        documentCluster.set(cluster),
        documentAlert.set(alert)
    ]);
});

export { UsersCreate };
