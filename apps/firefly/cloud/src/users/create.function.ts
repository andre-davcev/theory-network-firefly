import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, DocumentReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const database: Firestore = db();

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onCreate(async (snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id: string = snapshot.id;

    const user: any = ServiceFirestore.create(snapshot,
    {
        version: Version.Users
    });

    await Promise.all
    ([
        snapshot.ref.update(user),

        database.collection('user-alerts').doc(id).create({}),
        database.collection('user-clusters').doc(id).create({}),
        database.collection('user-events').doc(id).create({}),
        database.collection('user-icons').doc(id).create({}),
        database.collection('user-images').doc(id).create({}),
        database.collection('user-stream').doc(id).create({}),
        database.collection('user-subscriptions').doc(id).create({})
    ]);

    const timestamp: db.FieldValue     = db.FieldValue.serverTimestamp();
    const document:  DocumentReference = database.collection('clusters').doc();

    return database.collection('clusters').add
    ({
        id          : document.id,
        version     : '1.0.0',
        name        : 'Your first cluster!',
        description : `This is your first cluster. When you're ready to publish to the global catalog, flip off the private switch and join the Firefly community of publishers!`,
        private     : true,
        userId      : id,
        draft       : false,
        tagline     : 'Come enjoy my first event cluster',
        iconId      : 'admin###icons###default.png',
        dateCreated : timestamp,
        dateUpdated : timestamp
    });
});

export { UsersCreate };
