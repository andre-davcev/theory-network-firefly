import {
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult
} from '@google-cloud/firestore';
import { firestore } from 'firebase-admin';
import { EventContext, runWith } from 'firebase-functions';

import {
  CityInformation,
  GlobalVariable,
  InterestsService,
  ServiceStreams
} from '../library';
import {
  CityInfo,
  Collection,
  Event,
  Interest,
  StreamInterest
} from '../shared';

const InterestsCron = runWith({ memory: '2GB', timeoutSeconds: 540 })
  .pubsub.schedule('0 2 * * *') // Every Day At 2AM
  .onRun(async (context: EventContext) => {
    const database: Firestore = firestore();
    const debugDoc: firestore.DocumentReference = database
      .collection(Collection.Debug)
      .doc(Collection.Streams);
    const debug: boolean = true;
    const interestSubscribers: Record<string, number> = {};
    const interestVirtual: Record<string, boolean> = {};
    const eventScores: Record<string, number> = {};
    const interestCityEvents: Record<
      string,
      Record<string, Array<string>>
    > = {};
    const citiesCollection: Record<string, Record<string, StreamInterest>> = {};

    let id: string;
    let nearby: Record<string, number>;
    let interest: Interest;

    const interests: QuerySnapshot = await database
      .collection(Collection.Interests)
      .where('private', '==', false)
      .get();

    // Process and save all public interests
    interests.forEach((snapshot: QueryDocumentSnapshot) => {
      interest = snapshot.data() as Interest;
      id = snapshot.id;
      interestSubscribers[id] = interest.subscriberCount;
      interestVirtual[id] = interest.virtual;
      interestCityEvents[id] = {};
    });

    const cities: Record<string, CityInformation> =
      await InterestsService.citiesInfoGet(database);

    const time: number = new Date().getTime();

    let city: CityInfo;
    let cityId: string;
    let event: Event;
    let subscriberCount: number;

    const events: QuerySnapshot = await database
      .collection(Collection.Events)
      .where('private', '==', false)
      .get();

    // Process and save all events
    events.forEach((snapshot: QueryDocumentSnapshot) => {
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

            if (subscriberCount > cities[cityId].subscriberMax) {
              cities[cityId].subscriberMax = subscriberCount;
            }

            interestCityEvents[interestId][cityId].push(id);
            cities[cityId].interests.push(interestId);
          });
      }
    });

    const collection: firestore.CollectionReference = database.collection(
      Collection.Streams
    );
    const updates: Array<Promise<WriteResult>> = [];

    let score: number;
    let interestScore: number;
    let subscriberMax: number;
    let distanceScores: Record<string, number>;
    let cityInfo: CityInformation;
    let cityEvents: Record<string, Array<string>>;
    let cityStream: Record<string, StreamInterest>;

    // Process all cities and cities nearby
    Object.keys(cities).forEach((cityId: string) => {
      cityInfo = cities[cityId];
      nearby = cityInfo.nearby;
      distanceScores = cityInfo.distanceScore;
      cityStream = {};
      subscriberMax = cityInfo.subscriberMax === 0 ? 1 : cityInfo.subscriberMax;

      Object.keys(nearby).forEach((nearbyId: string) => {
        cities[nearbyId].interests.forEach((interestId: string) => {
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
          cities,
          citiesCollection,
          interestCityEvents,
          interestSubscribers,
          eventScores
        }
      });
    }

    return Promise.all(updates);
  });

export { InterestsCron };
