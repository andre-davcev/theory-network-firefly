import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore } from '@google-cloud/firestore';

const StreamGenerate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 0 * * *').
onRun(async (context: EventContext) =>
{
    const database:    Firestore = firestore();
    const userStreams: QuerySnapshot = await database.collection('user-streams').get();
    const clusters:    QuerySnapshot = await database.collection('clusters').get();

    const stream: Array<string> = [];
    const promises: Array<Promise<any>> = [];

    clusters.forEach((snapshot: QueryDocumentSnapshot) =>
        stream.push(snapshot.id)
    );

    userStreams.forEach((snapshot: QueryDocumentSnapshot) =>
        promises.push(snapshot.ref.update({ stream }))
    );

    return await Promise.all(promises);
});

export { StreamGenerate };

