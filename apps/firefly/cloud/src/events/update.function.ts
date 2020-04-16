import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceCities, Event, Collection } from '../library';

const database: Firestore = db();

const EventsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document(`${Collection.Events}/{id}`).
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const before: Event = change.before.data() as Event;
    const after:  Event = change.after.data()  as Event;

    const promises: Array<Promise<WriteResult>> = [];

    if (before.city.cityId !== after.city.cityId)
    {
        promises.push(ServiceCities.createIfNew(database, after));
    }

    return promises;
});

export { EventsUpdate };
