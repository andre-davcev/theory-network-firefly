import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue } from '@google-cloud/firestore';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

const UsersUpdate: CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('users/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    if (change.after.data().dateUpdated !== change.before.data().dateUpdated) return null;

    const data: Record<string, any> = { dateUpdated: FieldValue.serverTimestamp() };

    return change.after.ref.update(data);
});

export { UsersUpdate };
