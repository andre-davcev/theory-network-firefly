import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore } from '@google-cloud/firestore';

const StreamGenerate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 0 * * *').
onRun(async (context: EventContext) =>
{
    const database: Firestore = firestore();
    const users:    QuerySnapshot = await database.collection('users').get();
    const clusters: QuerySnapshot = await database.collection('clusters').get();

    const stream: Record<string, string> = {};
    const promises: Array<Promise<any>> = [];

    let id: string;

    clusters.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id = snapshot.id;

        stream[id] = id;
    });

    users.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        promises.push(snapshot.ref.update({ stream }));
    });

    return await Promise.all(promises);
});

export { StreamGenerate };

