import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { ServiceStreams, Cluster, Event } from '../library';
import { City } from '../library';

const StreamsCreate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 2 * * 1'). // Monday's @ 2AM
onRun(async (context: EventContext) =>
{
    const database: Firestore = firestore();

    const citiesQuery:   QuerySnapshot = await database.collection('cities').get();
    const clustersQuery: QuerySnapshot = await database.collection('clusters').where('private', '==', false).get();
    const eventsQuery:   QuerySnapshot = await database.collection('events').get();

    const cities:   Record<string, City> = {};
    const clusters: Record<string, Cluster> = {};
    const events:   Record<string, Event> = {};

    const cityClusters:      Record<string, Record<string, Cluster>>               = {};
    const citySubscriberMax: Record<string, number>                                = {};
    const cityDistanceScore: Record<string, Record<string, number>>                = {};
    const clusterCityEvents: Record<string, Record<string, Record<string, Event>>> = {};

    const nowInMillis: number = (new Date()).getMilliseconds();

    const updates: Array<Promise<WriteResult>> = [];

    let event   : Event;
    let cluster : Cluster;
    let city    : City;

    let id             : string;
    let cityId         : string;
    let citiesNearby   : Record<string, number>;
    let cityEvents     : Record<string, Record<string, Event>>;
    let distanceScores : Record<string, number>;
    let clusterScore   : number;

    clustersQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                    = snapshot.id;
        clusters[id]          = snapshot.data() as Cluster;
        clusterCityEvents[id] = {};
    });

    citiesQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id   = snapshot.id;
        city = snapshot.data() as City;

        citySubscriberMax[id] = 0;
        cities[id]            = city;
        cityClusters[id]      = {};
        cityDistanceScore[id] = { [id]: 1 };
        citiesNearby          = city.nearby;

        Object.keys(citiesNearby).forEach((cityId: string) =>
            cityDistanceScore[id][cityId] = ServiceStreams.scoreCityDistance(citiesNearby[cityId])
        );
    });

    eventsQuery.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id             = snapshot.id;
        event          = snapshot.data() as Event;
        event.metadata = { score: ServiceStreams.scoreEvent(event, nowInMillis) };
        events[id]     = event;

        event.clusters.forEach((clusterId: string) =>
        {
            cityId  = event.city.cityId;
            cluster = clusters[clusterId];

            if (clusterCityEvents[clusterId][cityId] == null)
            {
                clusterCityEvents[clusterId][cityId] = {};
            }

            if (cluster.subscriberCount > citySubscriberMax[cityId])
            {
                citySubscriberMax[cityId] = cluster.subscriberCount;
            }

            clusterCityEvents[clusterId][cityId][id] = event;
            cityClusters[cityId][clusterId]          = cluster;
        });
    });

    let eventsForCity: Record<string, Event>;
    let eventScoreTotal;
    let subscriberMax: number;

    Object.keys(cities).forEach((cityId: string) =>
    {
        Object.keys(cityClusters[cityId]).forEach((clusterId: string) =>
        {
            cluster      = clusters[clusterId];
            cityEvents   = clusterCityEvents[clusterId];
            clusterScore = 0;

            Object.keys(cityEvents).forEach((cityIdEvent: string) =>
            {
                distanceScores = cityDistanceScore[cityIdEvent];
                subscriberMax  = citySubscriberMax[cityIdEvent];
                eventsForCity  = cityEvents[cityIdEvent];

                Object.keys(eventsForCity).forEach((eventId: string) =>
                    clusterScore += eventsForCity[eventId].metadata.score
                );

/*
                // ToDo:
                clusterDistanceScore = clusterScore * distanceScore;
                subscriberRatio      = cluster.subscriberCount / subscriberMax;
                cityClusterScore     = (clusterDistanceScore * 0.2) + (clusterDistanceScore * 0.8 * subscriberRatio)
            });
        });
    });

    return Promise.all(updates);
});

export { StreamsCreate };
