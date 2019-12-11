import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';

const StreamsCreate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 0 * * *').
onRun(async (context: EventContext) =>
{
    const database: Firestore = firestore();
    const streams:  QuerySnapshot = await database.collection('streams').get();
    const clusters: QuerySnapshot = await database.collection('clusters').get();

    const stream:   Record<string, number>      = {};
    const promises: Array<Promise<WriteResult>> = [];

    let index: number = 0;

    clusters.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        stream[snapshot.id] = index;

        index++;
    });

    streams.forEach((snapshot: QueryDocumentSnapshot) =>
        promises.push(snapshot.ref.set(stream))
    );

    return await Promise.all(promises);
});

export { StreamsCreate };
