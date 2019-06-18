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

    const stream: Array<string> = [];
    const promises: Array<Promise<any>> = [];

    clusters.forEach((snapshot: QueryDocumentSnapshot) =>
        stream.push(snapshot.id)
    );

    users.forEach((snapshot: QueryDocumentSnapshot) =>
        promises.push(snapshot.ref.update({ stream }))
    );

    return await Promise.all(promises);
});

export { StreamGenerate };

