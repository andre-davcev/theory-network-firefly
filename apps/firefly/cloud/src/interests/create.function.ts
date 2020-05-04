import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, Interest, Collection } from '../library';
import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';

const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('interests');

const database: Firestore = db();

const InterestsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Interests}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const data = snapshot.data();
    const objectID = snapshot.id;
    const object: Interest = ServiceFirestore.create<Interest>(snapshot, Version.Interests);

    return Promise.all
    ([
        snapshot.ref.update(object),
        index.saveObject({ ...data, objectID})
    ]);
});

export { InterestsCreate };
