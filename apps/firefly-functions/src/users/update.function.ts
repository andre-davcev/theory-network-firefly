import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { FieldValue, DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';

import { Status, ServiceCities, SubscriptionPartial, Collection } from '../library';
import { User } from '../shared';

const database: Firestore = db();

const UsersUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document(`${Collection.Users}/{id}`).
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const updates: Array<Promise<WriteResult>> = [];

    const before : User = change.before.data() as User;
    const after  : User = change.after.data() as User;

    const subscriptionsStatusBefore : Record<string, SubscriptionPartial> = before.subscriptionsStatus;
    const subscriptionsStatusAfter  : Record<string, SubscriptionPartial> = after.subscriptionsStatus;

    const subscriptionKeysBefore : Array<string> = Object.keys(subscriptionsStatusBefore);
    const subscriptionKeysAfter  : Array<string> = Object.keys(subscriptionsStatusAfter);

    const subscriptionCountBefore : number = subscriptionKeysBefore.length;
    const subscriptionCountAfter  : number = subscriptionKeysAfter.length;

    let status: Status = Status.Unchanged;
    let interestId: string;

    const cityIdBefore: string = before.city?.id || '';
    const cityIdAfter:  string = after.city?.id || '';

    if (cityIdBefore !== cityIdAfter)
    {
        updates.push(ServiceCities.createIfNew(database, after));
    }

    if (subscriptionCountBefore === subscriptionCountAfter)
    {
        interestId = subscriptionKeysAfter.find((interestId: string) => subscriptionsStatusAfter[interestId].on !== subscriptionsStatusBefore[interestId].on);
        status    = interestId == null ? Status.Unchanged : subscriptionsStatusAfter[interestId].on ? Status.Added : Status.Removed;
    }
    else if (subscriptionCountBefore < subscriptionCountAfter)
    {
        interestId = subscriptionKeysAfter.find((interestId: string) => subscriptionsStatusBefore[interestId] == null);
        status    = Status.Added;
    }
    else if (subscriptionCountBefore > subscriptionCountAfter)
    {
        interestId = subscriptionKeysBefore.find((interestId: string) => subscriptionsStatusAfter[interestId] == null);
        status    = Status.Removed;
    }

    if (status === Status.Added)
    {
        updates.push(database.collection(Collection.Interests).doc(interestId).update({ subscriberCount: FieldValue.increment(1) }));
        updates.push(change.after.ref.update({ subscriptions: FieldValue.arrayUnion(interestId) }));
    }
    else if (status === Status.Removed)
    {
        updates.push(database.collection(Collection.Interests).doc(interestId).update({ subscriberCount: FieldValue.increment(-1) }));
        updates.push(change.after.ref.update({ subscriptions: FieldValue.arrayRemove(interestId) }));
    }

    return Promise.all(updates);
});

export { UsersUpdate };
