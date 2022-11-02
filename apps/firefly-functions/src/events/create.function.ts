import { firestore, EventContext, CloudFunction, config } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import algoliasearch from 'algoliasearch';

import { ServiceFirestore, Version, ServiceCities } from '../library';
import { Event, Collection } from '../shared';

const env = config();

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
        snapshot.ref.update({data: object}),
        ServiceCities.createIfNew(database, object),
        index.saveObject({ ...data, objectID})
    ]);
});

export { EventsCreate };
