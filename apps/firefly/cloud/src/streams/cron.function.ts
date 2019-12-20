import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { ServiceStreams, Cluster, Event, StreamVariable, StreamCluster } from '../library';
import { City } from '../library';

const StreamsCron =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 2 * * 1'). // Monday's @ 2AM
onRun(async (context: EventContext) =>
{
    const database           : Firestore                                     = firestore();
    const cities             : Array<string>                                 = [];
    const clusterSubscribers : Record<string, number>                        = {};
    const eventScores        : Record<string, number>                        = {};
    const cityClusters       : Record<string, Array<string>>                 = {};
    const citySubscriberMax  : Record<string, number>                        = {};
    const cityDistanceScore  : Record<string, Record<string, number>>        = {};
    const clusterCityEvents  : Record<string, Record<string, Array<string>>> = {};

    let id    : string;
    let query : QuerySnapshot = await database.collection('clusters').where('private', '==', false).get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                     = snapshot.id;
        clusterSubscribers[id] = (snapshot.data() as Cluster).subscriberCount;
        clusterCityEvents[id]  = {};
    });

    let citiesNearby : Record<string, number>;

    query = await database.collection('cities').get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                    = snapshot.id;
        citySubscriberMax[id] = 0;
        cityClusters[id]      = [];
        cityDistanceScore[id] = { [id]: 1 };
        citiesNearby          = (snapshot.data() as City).nearby;

        cities.push(id);

        Object.keys(citiesNearby).forEach((cityId: string) =>
            cityDistanceScore[id][cityId] = ServiceStreams.scoreCityDistance(citiesNearby[cityId])
        );
    });

    const nowInMillis: number = (new Date()).getMilliseconds();

    let city            : string;
    let event           : Event;
    let subscriberCount : number;

    query = await database.collection('events').get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id              = snapshot.id;
        event           = snapshot.data() as Event;
        eventScores[id] = ServiceStreams.scoreEvent(event, nowInMillis);

        event.clusters.forEach((clusterId: string) =>
        {
            city  = event.city.cityId;
            subscriberCount = clusterSubscribers[clusterId];

            if (clusterCityEvents[clusterId][city] == null)
            {
                clusterCityEvents[clusterId][city] = [];
            }

            if (subscriberCount > citySubscriberMax[city])
            {
                citySubscriberMax[city] = subscriberCount;
            }

            clusterCityEvents[clusterId][city].push(id);
            cityClusters[city].push(clusterId);
        });
    });

    query = null;

    const collection : firestore.CollectionReference = database.collection('streams');
    const updates    : Array<Promise<WriteResult>>   = [];

    let score          : number;
    let clusterScore   : number;
    let subscriberMax  : number;
    let cityStream     : Record<string, StreamCluster>;
    let distanceScores : Record<string, number>;
    let cityEvents     : Record<string, Array<string>>;

    cities.forEach((cityId: string) =>
    {
        distanceScores = cityDistanceScore[cityId];
        cityStream     = {};
        subscriberMax  = citySubscriberMax[cityId];

        cityClusters[cityId].forEach((clusterId: string) =>
        {
            subscriberCount = clusterSubscribers[clusterId];
            cityEvents      = clusterCityEvents[clusterId];
            clusterScore    = 0;

            Object.keys(cityEvents).forEach((cityIdEvent: string) =>
            {
                cityEvents[cityIdEvent].forEach((eventId: string) =>
                    clusterScore += eventScores[eventId]
                );

                clusterScore += (clusterScore * distanceScores[cityIdEvent]);
            });

            score = (clusterScore * StreamVariable.ClusterScoreWeightRaw) +
                    (clusterScore * StreamVariable.ClusterScoreWeightSubscribers * (subscriberCount / subscriberMax));

            cityStream[clusterId] = { score } as StreamCluster;
        });

        updates.push(collection.doc(cityId).set(cityStream));
    });

    return Promise.all(updates);
});

export { StreamsCron };
