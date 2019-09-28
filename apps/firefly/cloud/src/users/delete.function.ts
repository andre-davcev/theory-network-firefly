import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UsersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id: string = snapshot.id;

    await database.collection('user-clusters').doc(id).delete(),
    await database.collection('user-events').doc(id).delete();
    await database.collection('user-icons').doc(id).delete();
    await database.collection('user-images').doc(id).delete();

    return Promise.all
    ([
        database.collection('user-alerts').doc(id).delete(),
        database.collection('user-streams').doc(id).delete(),
        database.collection('user-subscriptions').doc(id).delete()
    ]);
});

export { UsersDelete };

