import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';

const database: Firestore = db();

const IconsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const bucketPath: string = snapshot.data().bucketPath;

    return Promise.all
    ([
        storage().bucket().file(bucketPath).delete()
    ]);
});

export { IconsDelete };
