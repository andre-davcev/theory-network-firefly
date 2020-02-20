import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult, FieldValue } from '@google-cloud/firestore';
import { Event, Alert } from '../library';
import { AlertsCreate } from '../alerts';

const EventsCron =

runWith( { memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('55 * * * *'). // Every hour @ 55 past the hour
onRun(async (context: EventContext) =>
{
/*
    cron hourly 55 mins past hour
    find hour past current time
    query events whose notifiedDateTime === generatedHourlyTimestamp
    for each interest id
        query users where interestId in user.subscriptions
        for each user
            create alert with alert.userId and with alert.tokens
    set event.timeNotifyComplete = true
*/
const database            : Firestore                                     = firestore();
const collection : firestore.CollectionReference = database.collection('alerts');
const updates    : Array<Promise<WriteResult>>   = [];

let query  : QuerySnapshot = await database.collection('events').where('notifyComplete', '==', false).get();
let id     : string;

query.forEach((snapshot: QueryDocumentSnapshot) =>
{
    let alert = {} as Alert;
    let event : Event = snapshot.data() as Event;
    id                     = snapshot.id;

    console.log(JSON.stringify(event));

    alert.bucketPath = event.bucketPath;
    alert.description = event.description;
    alert.eventId = event.id;
    alert.interestId = event.interests[0];
    alert.dateTime = FieldValue.serverTimestamp(),
    alert.name = event.name;
    alert.userId = event.userId;
    alert.version = '1.0.0';
    alert.read = false;

    event.notifyComplete = true;

    updates.push(collection.doc().set(alert));
    updates.push(snapshot.ref.update(event));
});

return Promise.all(updates);
});

export { EventsCron };
