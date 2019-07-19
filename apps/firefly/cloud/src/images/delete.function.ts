import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';

const ImagesDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('images/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;
    const userId:   string    = snapshot.data().userId;
    const path:     string    = id.replace(/-/g, '/');

    return Promise.all
    ([
        database.collection('image-events').doc(id).delete(),
        database.collection('user-images').doc(userId).update({ [id]: FieldValue.delete() }),
        storage().bucket().file(path).delete()
    ]);
});

export { ImagesDelete };
