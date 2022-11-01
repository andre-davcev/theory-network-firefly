import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot} from '@google-cloud/firestore';
import { config } from 'firebase-functions';
import algoliasearch from 'algoliasearch';

import { Collection } from '../library';

const env = config();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('interests');

const InterestsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document(`${Collection.Interests}/{id}`).
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
  const data = change.after.data();
  const objectID = change.after.id;

  return index.saveObject({ ...data, objectID});
});

export { InterestsUpdate };
