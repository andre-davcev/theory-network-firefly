import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot } from '@google-cloud/firestore';

const EventsUpdate: CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('events/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    if (change.after.data().dateUpdated !== change.before.data().dateUpdated) return null;

    const data: Record<string, any> = { dateUpdated: FieldValue.serverTimestamp() };

    return change.after.ref.update(data);
});

export { EventsUpdate };
