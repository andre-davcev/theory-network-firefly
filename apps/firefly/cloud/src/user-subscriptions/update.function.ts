import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot } from '@google-cloud/firestore';

const UserSubscriptionsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('user-subscriptions/{id}').
onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const id:     string                  = change.after.id;
    const before: Record<string, boolean> = change.before.data();
    const after:  Record<string, boolean> = change.after.data();

    const key: string = Object.keys(before).find((k: string) => before[k] !== after[k]);

    const subscriber: Record<string, string | FieldValue> =
        before[key] ?
        { [id]: id } :
        { [id]: FieldValue.delete() };

    return change.after.ref.update(subscriber);
});

export { UserSubscriptionsUpdate };
