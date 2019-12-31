import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { ServiceStreams, Cluster, Event, GlobalVariable, StreamCluster } from '../library';
import { City } from '../library';
import { object } from 'firebase-functions/lib/providers/storage';

const StreamsCron =

runWith( { memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('0 2 * * 1'). // Monday's @ 2AM
onRun(async (context: EventContext) =>
{
    const database           : Firestore                                     = firestore();
    const debugDoc           : firestore.DocumentReference                   = database.collection('debug').doc('streams');
    const debug              : boolean                                       = true;
    const citiesNearby       : Record<string, Record<string, number>>        = {};
    const clusterSubscribers : Record<string, number>                        = {};
    const eventScores        : Record<string, number>                        = {};
    const cityClusters       : Record<string, Array<string>>                 = {};
    const citySubscriberMax  : Record<string, number>                        = {};
    const cityDistanceScore  : Record<string, Record<string, number>>        = {};
    const clusterCityEvents  : Record<string, Record<string, Array<string>>> = {};
    const citiesCollection   : Record<string, Record<string, StreamCluster>> = {};

    let id     : string;
    let query  : QuerySnapshot = await database.collection('clusters').where('private', '==', false).get();
    let nearby : Record<string, number>;

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                     = snapshot.id;
        clusterSubscribers[id] = (snapshot.data() as Cluster).subscriberCount;
        clusterCityEvents[id]  = {};
    });

    query = await database.collection('cities').get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                    = snapshot.id;
        citySubscriberMax[id] = 0;
        cityClusters[id]      = [];
        cityDistanceScore[id] = { [id]: 1 };
        nearby                = (snapshot.data() as City).nearby;

        nearby[id]       = 0;
        citiesNearby[id] = nearby;

        Object.keys(nearby).forEach((cityId: string) =>
            cityDistanceScore[id][cityId] = ServiceStreams.scoreCityDistance(nearby[cityId])
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
        city            = event.city.cityId;

        event.clusters.forEach((clusterId: string) =>
        {
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

    let score            : number;
    let clusterScore     : number;
    let subscriberMax    : number;
    let distanceScores   : Record<string, number>;
    let cityEvents       : Record<string, Array<string>>;
    let cityStream       : Record<string, StreamCluster>;

    Object.keys(citiesNearby).forEach((cityId: string) =>
    {
        nearby         = citiesNearby[cityId];
        distanceScores = cityDistanceScore[cityId];
        cityStream     = {};
        subscriberMax  = citySubscriberMax[cityId] === 0 ? 1 : citySubscriberMax[cityId];

        Object.keys(nearby).forEach((nearbyId: string) =>
        {
            cityClusters[nearbyId].forEach((clusterId: string) =>
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

                score = (clusterScore * GlobalVariable.ClusterScoreWeightRaw) +
                        (clusterScore * GlobalVariable.ClusterScoreWeightSubscribers * (subscriberCount / subscriberMax));

                cityStream[clusterId] = { score } as StreamCluster;
            });
        });

        citiesCollection[cityId] = cityStream;

        updates.push(collection.doc(cityId).set(cityStream));
    });

    if (debug)
    {
        await debugDoc.set
        ({
            citiesNearby,
            citiesCollection,
            cityClusters,
            cityDistanceScore,
            citySubscriberMax,
            clusterCityEvents,
            clusterSubscribers,
            eventScores
        });
    }

    return Promise.all(updates);
});

export { StreamsCron };
