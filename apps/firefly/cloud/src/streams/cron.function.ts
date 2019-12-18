import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { ServiceCities } from '../library';

const StreamsCreate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 2 * * 1'). // Monday's @ 2AM
onRun(async (context: EventContext) =>
{
    const database: Firestore = firestore();

    const citiesQuery:   QuerySnapshot = await database.collection('cities').get();
    const clustersQuery: QuerySnapshot = await database.collection('clusters').get();
    const eventsQuery:   QuerySnapshot = await database.collection('events').get();

    const cities:   Record<string, any> = {};
    const clusters: Record<string, any> = {};
    const events:   Record<string, any> = {};

    const cityUsers:         Record<string, User>                                  = {};
    const cityClusters:      Record<string, Array<string>>                         = {};
    const cityDistanceScore: Record<string, Record<string, number>>                = {};
    const clusterCityEvents: Record<string, Record<string, Record<string, Event>>> = {};

    let id       : string;
    let document : any;

    let city          : string;
    let distanceScore : number;

    const distanceThreshold: number = ServiceCities.threshold;

    clustersQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                    = snapshot.id;
        clusters[id]          = snapshot.data();
        clusterCityEvents[id] = {};
    });

    let citiesNearby: Record<string, number>;
    let cityDistance: number;

    citiesQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id       = snapshot.id;
        document = snapshot.data();

        cities[id]            = document;
        cityUsers[id]         = {};
        cityClusters[id]      = [];
        cityDistanceScore[id] = { [id]: 1 };
        citiesNearby          = document.nearby;

        Object.keys(citiesNearby).forEach((cityId: string) =>
            cityDistanceScore[id][cityId] = ServiceStreams.cityDistanceScore(citiesNearby[cityId])
        );
    });

    eventsQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id         = snapshot.id;
        document   = snapshot.data();
        events[id] = document;

        document.clusters.forEach((clusterId: string) =>
        {
            city = document.cityId;

            if (clusterCityEvents[clusterId][city] == null)
            {
                clusterCityEvents[clusterId][city] = {};
            }

            clusterCityEvents[clusterId][city][id] = document;
            cityClusters[city].push(clusterId);
        });
    });

    const updates: Array<Promise<WriteResult>> = [];

    let cluster:       Cluster;
    let cityEvents:    Record<string, Record<string, Event>>;
    let distanceScores: Record<string, number>;
    let clusterScore:   number;

    Object.keys(cities).forEach((cityId: string) =>
    {
        cityClusters[cityId].forEach((clusterId: string) =>
        {
            cluster    = clusters[clusterId];
            cityEvents = clusterCityEvents[clusterId];

            clusterScore = 0;

            Object.keys(cityEvents).forEach((cityIdEvent: string) =>
            {
                distanceScores = cityDistanceScore[cityIdEvent];
            });
        });
    });

    return Promise.all(updates);
});

export { StreamsCreate };
