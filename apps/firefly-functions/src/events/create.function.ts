import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import algoliasearch from 'algoliasearch';
import { firestore as db } from 'firebase-admin';
import {
  CloudFunction,
  EventContext,
  config,
  firestore
} from 'firebase-functions';

import { ServiceCities, ServiceFirestore, Version } from '../library';
import { Collection, Event } from '../shared';

const env = config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');

const database: Firestore = db();

const EventsCreate: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Events}/{id}`)
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const object: Event = ServiceFirestore.create<Event>(
      snapshot,
      Version.Events
    );
    const data = snapshot.data();
    const objectID = snapshot.id;

    return Promise.all([
      snapshot.ref.set(object),
      ServiceCities.createCityIfNew(database, object),
      ServiceCities.createStreamIfNew(database, object),
      index.saveObject({ ...data, objectID })
    ]);
  });

export { EventsCreate };
