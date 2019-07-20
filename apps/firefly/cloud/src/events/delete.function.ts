import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const EventsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('events/{id}').
onDelete((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:       string              = snapshot.id;
    const data:     Record<string, any> = snapshot.data();
    const userId:   string              = data.userId;
    const imageId:  string              = data.imageId;

    return Promise.all
    ([
        database.collection('event-clusters').doc(id).delete(),
        database.collection('image-events').doc(imageId).update({ [id]: FieldValue.delete() }),
        database.collection('user-events').doc(userId).update({ [id]: FieldValue.delete() })
    ]);
});

export { EventsDelete };
