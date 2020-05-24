import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceCities, Event, Collection } from '../library';
import * as functions from 'firebase-functions';
const env = functions.config();
import algoliasearch from 'algoliasearch';

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');

const database: Firestore = db();

const EventsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document(`${Collection.Events}/{id}`).
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const before: Event = change.before.data() as Event;
    const after:  Event = change.after.data()  as Event;

    const data = after
    const objectID = change.after.id;

    const promises: Array<Promise<WriteResult>> = [];

    if (before.city.cityId !== after.city.cityId)
    {
        promises.push(ServiceCities.createIfNew(database, after));
    }

    return Promise.all
    ([
        promises,
        index.saveObject({ ...data, objectID})
    ]);
});

export { EventsUpdate };
