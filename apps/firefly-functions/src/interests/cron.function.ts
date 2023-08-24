import { Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore } from 'firebase-admin';
import { EventContext, runWith } from 'firebase-functions';

import {
  CityInformation,
  EventInformation,
  InterestInformation,
  ServiceStreams
} from '../library';
import { Collection, StreamInterest } from '../shared';

const InterestsCron = runWith({ memory: '2GB', timeoutSeconds: 540 })
  .pubsub.schedule('0 2 * * *') // Every Day At 2AM
  .onRun(async (context: EventContext) => {
    const database: Firestore = firestore();

    const interests: Record<string, InterestInformation> =
      await ServiceStreams.interestsInfo(database);
    const cities: Record<string, CityInformation> =
      await ServiceStreams.citiesInfo(database);
    const events: Record<string, EventInformation> =
      await ServiceStreams.eventsInfo(database, interests, cities);

    // Process all cities and cities nearby
    const collection: firestore.CollectionReference = database.collection(
      Collection.Streams
    );
    const interestStreams: Record<
      string,
      Record<string, StreamInterest>
    > = ServiceStreams.interestStreams(interests, cities, events);
    const updates: Array<Promise<WriteResult>> = Object.keys(
      interestStreams
    ).map((cityId: string) =>
      collection.doc(cityId).set(interestStreams[cityId])
    );

    const debug: boolean = false;

    // Debug Flag
    if (debug) {
      const timestamp: string = new Date().toISOString().split('.')[0];
      const debugDoc: firestore.DocumentReference = database
        .collection(Collection.Debug)
        .doc(Collection.Streams);

      await debugDoc.update({
        [timestamp]: {
          cities,
          interests,
          events,
          interestStreams
        }
      });
    }

    return Promise.all(updates);
  });

export { InterestsCron };
