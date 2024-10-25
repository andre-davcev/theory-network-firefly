import { DocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { CloudFunction, EventContext, firestore } from 'firebase-functions';
// import { config } from 'firebase-functions';
// import algoliasearch from 'algoliasearch';

import { ServiceFirestore, Version } from '../library';
import { Collection, List } from '../shared';

// const env = config();

// const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
// const index = client.initIndex('lists');

db();

const ListsCreate: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Lists}/{id}`)
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    const object: List = ServiceFirestore.create<List>(snapshot, Version.Lists);

    return Promise.all([
      snapshot.ref.set(object)
      // index.saveObject({ ...data, objectID })
    ]);
  });

export { ListsCreate };
