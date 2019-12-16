import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceCities, ServiceFirestore } from '../library';

const database: Firestore = db();

const EventsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('events/{id}').
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const before: any = change.before.data();
    const after:  any = change.after.data();

    const promises: Array<Promise<WriteResult>> = [];

    if (before.city.cityId !== after.city.cityId)
    {
        promises.push(ServiceCities.createIfNew(database, after.city));
    }

    return promises;
});

export { EventsUpdate };
