import {
  DocumentSnapshot,
  Firestore,
  WriteResult
} from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import {
  Change,
  CloudFunction,
  EventContext,
  firestore
} from 'firebase-functions';
// import algoliasearch from 'algoliasearch';

import { ServiceCities } from '../library';
import { Collection, Event } from '../shared';

// const env = config();
// const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
// const index = client.initIndex('events');

const database: Firestore = db();

const EventsUpdate: CloudFunction<Change<DocumentSnapshot>> = firestore
  .document(`${Collection.Events}/{id}`)
  .onUpdate(
    async (
      change: Change<firestore.DocumentSnapshot>,
      context: EventContext
    ) => {
      const before: Event = change.before.data() as Event;
      const after: Event = change.after.data() as Event;

      // const data = after;
      // const objectID = change.after.id;

      const promises: Array<Promise<WriteResult>> = [];

      if (before.city.id !== after.city.id) {
        promises.push(ServiceCities.createCityIfNew(database, after));
      }

      return Promise.all([promises]);
      // return Promise.all([promises, index.saveObject({ ...data, objectID })]);
    }
  );

export { EventsUpdate };
