import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { Status, User, Subscription, ServiceCities } from '../library';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const UsersUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('users/{id}').
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

    const cityIdBefore: string = before.city == null ? '' : before.city.cityId;
    const cityIdAfter:  string = after.city  == null ? '' : after.city.cityId;

    if (cityIdBefore !== cityIdAfter)
    {
        updates.push(ServiceCities.createIfNew(database, after));
    }

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
        updates.push(database.collection('clusters').doc(clusterId).update({ subscriberCount: FieldValue.increment(1) }));
        updates.push(change.after.ref.update({ subscriptions: FieldValue.arrayUnion(clusterId) }));
    }
    else if (status === Status.Removed)
    {
        updates.push(database.collection('clusters').doc(clusterId).update({ subscriberCount: FieldValue.increment(-1) }));
        updates.push(change.after.ref.update({ subscriptions: FieldValue.arrayRemove(clusterId) }));
    }

    return Promise.all(updates);
});

export { UsersUpdate };
