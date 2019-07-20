import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ImageEventsDelete : CloudFunction<DocumentSnapshot> =

firestore.
document('image-events/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const data:       Record<string, string>      = snapshot.data();
    const collection: CollectionReference         = database.collection('events');
    const promises:   Array<Promise<WriteResult>> = [];

    Object.keys(data).forEach((key: string) =>
        promises.push(collection.doc(key).update({ imageId: FieldValue.delete() }))
    );

    return Promise.all(promises);
});

export { ImageEventsDelete };

