import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { Status, User, Subscription } from '../library';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UserSubscriptionsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('user/{id}').
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const updates: Array<Promise<WriteResult>> = [];

    const before : User = change.before.data() as User;
    const after  : User = change.after.data() as User;

    const subscriptionsStatusBefore : Record<string, Subscription> = before.subscriptionsStatus;
    const subscriptionsStatusAfter  : Record<string, Subscription> = after.subscriptionsStatus;

    const subscriptionKeysBefore : Array<string> = Object.keys(subscriptionsStatusBefore);
    const subscriptionKeysAfter  : Array<string> = Object.keys(subscriptionsStatusAfter);

    const subscriptionCountBefore : number = subscriptionKeysBefore.length;
    const subscriptionCountAfter  : number = subscriptionKeysAfter.length;

    let status: Status = Status.Unchanged;
    let clusterId: string;

    if (subscriptionCountBefore === subscriptionCountAfter)
    {
        clusterId = subscriptionKeysAfter.find((clusterId: string) => subscriptionsStatusAfter[clusterId].on !== subscriptionsStatusBefore[clusterId].on);
        status    = clusterId == null ? Status.Unchanged : subscriptionsStatusAfter[clusterId].on ? Status.Added : Status.Removed;
    }
    else if (subscriptionCountBefore < subscriptionCountAfter)
    {
        clusterId = subscriptionKeysAfter.find((clusterId: string) => subscriptionsStatusBefore[clusterId] == null);
        status    = Status.Added;
    }
    else if (subscriptionCountBefore > subscriptionCountAfter)
    {
        clusterId = subscriptionKeysBefore.find((clusterId: string) => subscriptionsStatusAfter[clusterId] == null);
        status    = Status.Removed;
    }

    if (status === Status.Added)
    {
        const subscriptions : Array<string> = after.subscriptions;

        subscriptions.push(clusterId);

        updates.push(database.collection('clusters').doc(clusterId).update({ subscriberCount: FieldValue.increment(1) }));
        updates.push(change.after.ref.update({ subscriptions }));
    }
    else if (status === Status.Removed)
    {
        const subscriptions : Array<string> = after.subscriptions;
        const index         : number        = subscriptions.findIndex((id: string) => clusterId === id);

        subscriptions.splice(index, 1);

        updates.push(database.collection('clusters').doc(clusterId).update({ subscriberCount: FieldValue.increment(-1) }));
        updates.push(change.after.ref.update({ subscriptions }));
    }

    return Promise.all(updates);
});

export { UserSubscriptionsUpdate };
