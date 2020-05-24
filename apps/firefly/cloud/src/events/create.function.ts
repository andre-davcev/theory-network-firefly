import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, ServiceCities, Event, Collection } from '../library';
import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';

const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');

const database: Firestore = db();

const EventsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Events}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Event = ServiceFirestore.create<Event>(snapshot, Version.Events);
    const data = snapshot.data();
    const objectID = snapshot.id;

    return Promise.all
    ([
        snapshot.ref.update(object),
        ServiceCities.createIfNew(database, object),
        index.saveObject({ ...data, objectID})
    ]);
});

export { EventsCreate };
