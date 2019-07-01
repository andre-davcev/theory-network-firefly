import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';

const IconsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;
    const userId:   string    = snapshot.data().userId;
    const path:     string    = id.replace(/-/g, '/');

    return Promise.all
    ([
        storage().bucket().file(path).delete(),
        database.collection('user-icons').doc(userId).update({ [id]: FieldValue.delete() })
    ]);
});

export { IconsDelete };
