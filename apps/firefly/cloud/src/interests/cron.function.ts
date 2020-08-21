import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { ServiceStreams, Interest, Event, GlobalVariable, StreamInterest, Collection } from '../library';
import { City } from '../library';

const InterestsCron =

runWith( { memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('0 2 * * 1'). // Monday's @ 2AM
onRun(async (context: EventContext) =>
{
    const database            : Firestore                                     = firestore();
    const debugDoc            : firestore.DocumentReference                   = database.collection(Collection.Debug).doc(Collection.Streams);
    const debug               : boolean                                       = true;
    const citiesNearby        : Record<string, Record<string, number>>        = {};
    const interestSubscribers : Record<string, number>                        = {};
    const eventScores         : Record<string, number>                        = {};
    const cityInterests       : Record<string, Array<string>>                 = {};
    const citySubscriberMax   : Record<string, number>                        = {};
    const cityDistanceScore   : Record<string, Record<string, number>>        = {};
    const interestCityEvents  : Record<string, Record<string, Array<string>>> = {};
    const citiesCollection    : Record<string, Record<string, StreamInterest>> = {};

    let id     : string;
    let query  : QuerySnapshot = await database.collection(Collection.Interests).where('private', '==', false).get();
    let nearby : Record<string, number>;

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                     = snapshot.id;
        interestSubscribers[id] = (snapshot.data() as Interest).subscriberCount;
        interestCityEvents[id]  = {};
    });

    query = await database.collection(Collection.Cities).get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id                    = snapshot.id;
        citySubscriberMax[id] = 0;
        cityInterests[id]      = [];
        cityDistanceScore[id] = {};
        nearby                = (snapshot.data() as City).nearby;

        citiesNearby[id] = nearby;

        Object.keys(nearby).forEach((cityId: string) =>
            cityDistanceScore[id][cityId] = ServiceStreams.scoreCityDistance(nearby[cityId])
        );
    });

    const time: number = (new Date()).getTime();

    let city            : string;
    let event           : Event;
    let subscriberCount : number;

    query = await database.collection(Collection.Events).get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        id              = snapshot.id;
        event           = snapshot.data() as Event;
        eventScores[id] = ServiceStreams.scoreEvent(event, time);
        city            = event.city.id;

        event.interests.
        filter((interestId: string) =>
            interestCityEvents[interestId] != null
        ).
        forEach((interestId: string) =>
        {
            subscriberCount = interestSubscribers[interestId];

            if (interestCityEvents[interestId][city] == null)
            {
                interestCityEvents[interestId][city] = [];
            }

            if (subscriberCount > citySubscriberMax[city])
            {
                citySubscriberMax[city] = subscriberCount;
            }

            interestCityEvents[interestId][city].push(id);
            cityInterests[city].push(interestId);
        });
    });

    query = null;

    const collection : firestore.CollectionReference = database.collection(Collection.Streams);
    const updates    : Array<Promise<WriteResult>>   = [];

    let score            : number;
    let interestScore    : number;
    let subscriberMax    : number;
    let distanceScores   : Record<string, number>;
    let cityEvents       : Record<string, Array<string>>;
    let cityStream       : Record<string, StreamInterest>;

    Object.keys(citiesNearby).forEach((cityId: string) =>
    {
        nearby         = citiesNearby[cityId];
        distanceScores = cityDistanceScore[cityId];
        cityStream     = {};
        subscriberMax  = citySubscriberMax[cityId] === 0 ? 1 : citySubscriberMax[cityId];

        Object.keys(nearby).forEach((nearbyId: string) =>
        {
            cityInterests[nearbyId].forEach((interestId: string) =>
            {
                subscriberCount = interestSubscribers[interestId];
                cityEvents      = interestCityEvents[interestId];
                interestScore   = 0;

                Object.keys(cityEvents).forEach((cityIdEvent: string) =>
                {
                    cityEvents[cityIdEvent].forEach((eventId: string) =>
                        interestScore += eventScores[eventId]
                    );

                    interestScore += (interestScore * distanceScores[cityIdEvent]);
                });

                score = (interestScore * GlobalVariable.InterestScoreWeightRaw) +
                        (interestScore * GlobalVariable.InterestScoreWeightSubscribers * (subscriberCount / subscriberMax));

                cityStream[interestId] = { score } as StreamInterest;
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
            cityInterests,
            cityDistanceScore,
            citySubscriberMax,
            interestCityEvents,
            interestSubscribers,
            eventScores
        });
    }

    return Promise.all(updates);
});

export { InterestsCron };
