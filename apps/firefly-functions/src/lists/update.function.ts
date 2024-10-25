import { DocumentSnapshot } from '@google-cloud/firestore';
import algoliasearch from 'algoliasearch';
import {
  Change,
  CloudFunction,
  config,
  EventContext,
  firestore
} from 'firebase-functions';

import { Collection } from '../shared';

const env = config();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('lists');

const ListsUpdate: CloudFunction<Change<DocumentSnapshot>> = firestore
  .document(`${Collection.Lists}/{id}`)
  .onUpdate(
    async (
      change: Change<firestore.DocumentSnapshot>,
      context: EventContext
    ) => {
      const data = change.after.data();
      const objectID = change.after.id;

      return index.saveObject({ ...data, objectID });
    }
  );

export { ListsUpdate };
