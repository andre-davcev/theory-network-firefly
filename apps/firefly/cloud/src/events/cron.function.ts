import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { Event, Alert, Version, Collection } from '../library';

const EventsCron =

runWith( { memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('55 * * * *'). // Every hour @ 55 past the hour
onRun(async (context: EventContext) =>
{
    const database   : Firestore                     = firestore();
    const collection : firestore.CollectionReference = database.collection(Collection.Alerts);
    const updates    : Array<Promise<WriteResult>>   = [];

    const events: QuerySnapshot = await database.collection(Collection.Events).where('notifyComplete', '==', false).get();

    events.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        const event = snapshot.data() as Event;

        const alert: Alert =
        {
            ...event,

            version : Version.Alerts,
            eventId : event.id,
            read    : false
        };

        event.notifyComplete = true;

        updates.push(collection.doc().set(alert));
        updates.push(snapshot.ref.update(event));
    });

    return Promise.all(updates);
});

export { EventsCron };
