import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';

const UserStreamsCreate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 0 * * *').
onRun(async (context: EventContext) =>
{
    const database:    Firestore = firestore();
    const userStreams: QuerySnapshot = await database.collection('user-streams').get();
    const clusters:    QuerySnapshot = await database.collection('clusters').get();

    const stream:   Record<string, number>      = {};
    const promises: Array<Promise<WriteResult>> = [];

    const pageSize: number = 30;
    let index: number;

    clusters.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        stream[snapshot.id] = Math.floor(pageSize / index);

        index++;
    });

    userStreams.forEach((snapshot: QueryDocumentSnapshot) =>
        promises.push(snapshot.ref.set(stream))
    );

    return await Promise.all(promises);
});

export { UserStreamsCreate };
