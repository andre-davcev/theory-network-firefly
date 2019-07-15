import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const UserDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const promises: Array<Promise<WriteResult>> = [];

    const clustersSnapshot: DocumentSnapshot = await database.collection('user-clusters').doc(id).get();
    const eventsSnapshot:   DocumentSnapshot = await database.collection('user-events').doc(id).get();
    const imagesSnapshot:   DocumentSnapshot = await database.collection('user-images').doc(id).get();
    const iconsSnapshot:    DocumentSnapshot = await database.collection('user-icons').doc(id).get();

    const clustersRef: CollectionReference = database.collection('clusters');
    const eventsRef:   CollectionReference = database.collection('events');
    const imagesRef:   CollectionReference = database.collection('images');
    const iconsRef:    CollectionReference = database.collection('icons');

    Object.keys(clustersSnapshot.data() == null ? {} : clustersSnapshot.data()).forEach((key: string) => promises.push(clustersRef.doc(key).delete()));
    Object.keys(eventsSnapshot.data() == null ? {} : eventsSnapshot.data()).forEach((key: string)   => promises.push(eventsRef.doc(key).delete()));
    Object.keys(imagesSnapshot.data() == null ? {} : eventsSnapshot.data()).forEach((key: string)   => promises.push(imagesRef.doc(key).delete()));
    Object.keys(iconsSnapshot.data() == null ? {} : iconsSnapshot.data()).forEach((key: string)    => promises.push(iconsRef.doc(key).delete()));

    return Promise.all
    ([
        ...promises,

        database.collection('user-alerts').doc(id).delete(),
        database.collection('user-streams').doc(id).delete(),
        database.collection('user-subscriptions').doc(id).delete(),
    ]);
});

export { UserDelete };

