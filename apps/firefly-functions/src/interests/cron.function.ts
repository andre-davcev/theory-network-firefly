import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  Firestore,
  WriteResult
} from '@google-cloud/firestore';

import { ServiceStreams, GlobalVariable } from '../library';
import {
  Interest,
  Event,
  StreamInterest,
  City,
  Collection,
  CityInfo
} from '../shared';

const InterestsCron = runWith({ memory: '2GB', timeoutSeconds: 540 })
  .pubsub.schedule('0 2 * * 1') // Monday's @ 2AM
  .onRun(async (context: EventContext) => {
    const database: Firestore = firestore();
    const debugDoc: firestore.DocumentReference = database
      .collection(Collection.Debug)
      .doc(Collection.Streams);
    const debug: boolean = true;
    const citiesNearby: Record<string, Record<string, number>> = {};
    const interestSubscribers: Record<string, number> = {};
    const interestVirtual: Record<string, boolean> = {};
    const eventScores: Record<string, number> = {};
    const cityInterests: Record<string, Array<string>> = {};
    const citySubscriberMax: Record<string, number> = {};
    const cityDistanceScore: Record<string, Record<string, number>> = {};
    const interestCityEvents: Record<
      string,
      Record<string, Array<string>>
    > = {};
    const citiesCollection: Record<string, Record<string, StreamInterest>> = {};

    let id: string;
    let query: QuerySnapshot = await database
      .collection(Collection.Interests)
      .where('private', '==', false)
      .get();
    let nearby: Record<string, number>;
    let interest: Interest;

    // Process and save all public interests
    query.forEach((snapshot: QueryDocumentSnapshot) => {
      interest = snapshot.data() as Interest;
      id = snapshot.id;
      interestSubscribers[id] = interest.subscriberCount;
      interestVirtual[id] = interest.virtual;
      interestCityEvents[id] = {};
    });

    query = await database.collection(Collection.Cities).get();

    // Process and save all cities
    query.forEach((snapshot: QueryDocumentSnapshot) => {
      id = snapshot.id;
      citySubscriberMax[id] = 0;
      cityInterests[id] = [];
      cityDistanceScore[id] = {};
      nearby = (snapshot.data() as City).nearby;

      citiesNearby[id] = nearby;

      Object.keys(nearby).forEach(
        (cityId: string) =>
          (cityDistanceScore[id][cityId] = ServiceStreams.scoreCityDistance(
            nearby[cityId]
          ))
      );
    });

    const time: number = new Date().getTime();

    let city: CityInfo;
    let cityId: string;
    let event: Event;
    let subscriberCount: number;

    query = await database
      .collection(Collection.Events)
      .where('private', '==', false)
      .get();

    // Process and save all events
    query.forEach((snapshot: QueryDocumentSnapshot) => {
      id = snapshot.id;
      event = snapshot.data() as Event;
      eventScores[id] = ServiceStreams.scoreEvent(event, time);
      city = event.city;

      if (city != null) {
        cityId = city.id;

        event.interests
          .filter(
            (interestId: string) => interestCityEvents[interestId] != null
          )
          .forEach((interestId: string) => {
            subscriberCount = interestSubscribers[interestId];

            if (interestCityEvents[interestId][cityId] == null) {
              interestCityEvents[interestId][cityId] = [];
            }

            if (subscriberCount > citySubscriberMax[cityId]) {
              citySubscriberMax[cityId] = subscriberCount;
            }

            interestCityEvents[interestId][cityId].push(id);
            cityInterests[cityId].push(interestId);
          });
      }
    });

    query = null;

    const collection: firestore.CollectionReference = database.collection(
      Collection.Streams
    );
    const updates: Array<Promise<WriteResult>> = [];

    let score: number;
    let interestScore: number;
    let subscriberMax: number;
    let distanceScores: Record<string, number>;
    let cityEvents: Record<string, Array<string>>;
    let cityStream: Record<string, StreamInterest>;

    // Process all cities and cities nearby
    Object.keys(citiesNearby).forEach((cityId: string) => {
      nearby = citiesNearby[cityId];
      distanceScores = cityDistanceScore[cityId];
      cityStream = {};
      subscriberMax =
        citySubscriberMax[cityId] === 0 ? 1 : citySubscriberMax[cityId];

      Object.keys(nearby).forEach((nearbyId: string) => {
        cityInterests[nearbyId].forEach((interestId: string) => {
          subscriberCount = interestSubscribers[interestId];
          cityEvents = interestCityEvents[interestId];
          interestScore = 0;

          Object.keys(cityEvents).forEach((cityIdEvent: string) => {
            cityEvents[cityIdEvent].forEach(
              (eventId: string) => (interestScore += eventScores[eventId])
            );

            interestScore += interestScore * distanceScores[cityIdEvent];
          });

          score =
            interestScore * GlobalVariable.InterestScoreWeightRaw +
            interestScore *
              GlobalVariable.InterestScoreWeightSubscribers *
              (subscriberCount / subscriberMax);

          cityStream[interestId] = {
            score,
            virtual: interestVirtual[interestId]
          } as StreamInterest;
        });
      });

      citiesCollection[cityId] = cityStream;

      updates.push(collection.doc(cityId).set(cityStream));
    });

    if (debug) {
      const timestamp: string = new Date().toISOString();

      await debugDoc.set({
        [timestamp]: {
          citiesNearby,
          citiesCollection,
          cityInterests,
          cityDistanceScore,
          citySubscriberMax,
          interestCityEvents,
          interestSubscribers,
          eventScores
        }
      });
    }

    return Promise.all(updates);
  });

export { InterestsCron };
