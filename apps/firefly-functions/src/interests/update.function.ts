import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot} from '@google-cloud/firestore';
import { Collection } from '../library';
import * as functions from 'firebase-functions';
const env = functions.config();
import algoliasearch from 'algoliasearch';

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
