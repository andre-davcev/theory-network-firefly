import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, Image } from '../library';

const database: Firestore = db();

const ImagesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('images/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Image = ServiceFirestore.create<Image>(snapshot, { version: Version.Images });

    return snapshot.ref.update(object);
});

export { ImagesCreate };
