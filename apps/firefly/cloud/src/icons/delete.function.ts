import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';

const database: Firestore = db();

const IconsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:     string              = snapshot.id;
    const data:   Record<string, any> = snapshot.data();
    const userId: string              = data.userId;
    const path:   string              = `${userId}/icons/${data.id}.${data.mediaType}`;

    return Promise.all
    ([
        database.collection('user-icons').doc(userId).update({ [id]: FieldValue.delete() }),
        storage().bucket().file(path).delete()
    ]);
});

export { IconsDelete };
