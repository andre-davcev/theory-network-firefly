import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const EventsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('events/{id}').
onDelete((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore = db();
    const id:       string    = snapshot.id;
    const userId:   string    = snapshot.data().userId;

    return database.collection('user-events').doc(userId).update({ [id]: FieldValue.delete() });
});

export { EventsDelete };
