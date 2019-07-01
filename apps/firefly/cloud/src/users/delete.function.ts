import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

const UserDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;

    const promises: Array<Promise<WriteResult>> = [];

    const clusters: DocumentSnapshot = await database.collection('user-clusters').doc(id).get();
    const events:   DocumentSnapshot = await database.collection('user-events').doc(id).get();
    const images:   DocumentSnapshot = await database.collection('user-images').doc(id).get();
    const icons:    DocumentSnapshot = await database.collection('user-icons').doc(id).get();

    const clustersRef: CollectionReference = database.collection('collection');
    const eventsRef:   CollectionReference = database.collection('events');
    const imagesRef:   CollectionReference = database.collection('images');
    const iconsRef:    CollectionReference = database.collection('icons');

    Object.keys(clusters.data()).forEach((key: string) => promises.push(clustersRef.doc(key).delete()));
    Object.keys(events.data()).forEach((key: string)   => promises.push(eventsRef.doc(key).delete()));
    Object.keys(images.data()).forEach((key: string)   => promises.push(imagesRef.doc(key).delete()));
    Object.keys(icons.data()).forEach((key: string)    => promises.push(iconsRef.doc(key).delete()));

    const bucket: Bucket = storage().bucket();

    return Promise.all
    ([
        ...promises,

        database.collection('user-alerts').doc(id).delete(),
        database.collection('user-streams').doc(id).delete(),
        database.collection('user-subscriptions').doc(id).delete(),
    ]);
});

export { UserDelete };

