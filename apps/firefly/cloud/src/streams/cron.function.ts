import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { ServiceCities } from '../library';

const StreamsCreate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 0 * * *').
onRun(async (context: EventContext) =>
{
    const database: Firestore = firestore();

    const citiesQuery:   QuerySnapshot = await database.collection('cities').get();
    const usersQuery:    QuerySnapshot = await database.collection('users').get();
    const clustersQuery: QuerySnapshot = await database.collection('clusters').get();
    const eventsQuery:   QuerySnapshot = await database.collection('events').get();

    const cities:   Record<string, any> = {};
    const users:    Record<string, any> = {};
    const clusters: Record<string, any> = {};
    const events:   Record<string, any> = {};

    const cityUsers:     Record<string, any> = {};
    const clusterEvents: Record<string, any> = {};

    let id       : string;
    let document : any;

    let distanceScore: number;

    const distanceThreshold: number = ServiceCities.threshold;

    citiesQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id            = snapshot.id;
        cities[id]    = snapshot.data();
        cityUsers[id] = {};
    });

    usersQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id       = snapshot.id;
        document = snapshot.data();

        users[id]                               = document;
        cityUsers[document.location.cityId][id] = document;
    });

    clustersQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                = snapshot.id;
        clusters[id]      = snapshot.data();
        clusterEvents[id] = {};
    });

    eventsQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id       = snapshot.id;
        document = snapshot.data();
        events[id] = document;

        document.clusters.forEach((clusterId: string) =>
        {
            clusterEvents[clusterId][id] = document;
        });
    });
/*
    event score
        notifyComplete - reduce score by 25%
        event distance - ((t-d)/t)^3
    cluster score
        subscriberCount - count / max
        event notifyComplete count > 0
        event score avg
        event score total
*/
    const promises: Array<Promise<WriteResult>> = [];

    return Promise.all(promises);
});

export { StreamsCreate };
