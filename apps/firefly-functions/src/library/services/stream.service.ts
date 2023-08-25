import { Timestamp } from 'firebase/firestore';

import {
  CollectionReference,
  DocumentReference,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@google-cloud/firestore';
import {
  City,
  CityInfo,
  Collection,
  Event,
  Interest,
  StreamInterest
} from '../../shared';
import { GlobalVariable } from '../enums';

export interface CityInformation {
  interests: Array<string>;
  subscriberMax: number;
  distanceScore: Record<string, number>;
  nearby: Record<string, number>;
}

export interface InterestInformation {
  subscribers: number;
  virtual: boolean;
  cityEvents: Record<string, Array<string>>;
}

export interface EventInformation {
  score: number;
}

export class ServiceStreams {
  /**
   * ((t - d)/t)^4
   *
   * @param distance
   */
  public static scoreCityDistance(distance: number): number {
    return distance >= GlobalVariable.DistanceThreshold
      ? 0
      : Math.pow(
          (GlobalVariable.DistanceThreshold - distance) /
            GlobalVariable.DistanceThreshold,
          GlobalVariable.DistanceScorePower
        );
  }

  public static scoreEvent(event: Event, nowInMillis: number): number {
    const timeNotify: number = event.timeNotify.toDate().getTime();
    const timeStart: number = event.timeStart.toDate().getTime();

    if (
      event.notifyComplete ||
      timeNotify <= nowInMillis ||
      timeStart <= nowInMillis
    ) {
      return GlobalVariable.EventUpcomingMin;
    }

    return (
      ServiceStreams.scoreEventRecentlyAdded(event, nowInMillis) *
        GlobalVariable.EventRecentlyAddedWeight +
      ServiceStreams.scoreEventPopularity(event) +
      ServiceStreams.scoreEventUpcoming(event, nowInMillis)
    );
  }

  /**
   * Weight: Weeks from todays date
   * Range:  0 - 8+
   * Score:  1 - 0.1
   * Period: 1 Week
   *
   * @param event
   * @param nowInMillis
   */
  public static scoreEventRecentlyAdded(
    event: Event,
    nowInMillis: number
  ): number {
    const dateCreated: number = (event.dateCreated as Timestamp)
      .toDate()
      .getTime();
    const millisDiff: number = nowInMillis - dateCreated;

    const segments: number = Math.floor(
      millisDiff / GlobalVariable.EventRecentlyAddedSegmentMillis
    );

    return segments > 8
      ? GlobalVariable.EventRecentlyAddedMin
      : (10 - segments) * 0.1;
  }

  public static scoreEventPopularity(event: Event): number {
    const interestCount: number = event.interests.length;
    const segments: number =
      Math.floor(interestCount / GlobalVariable.EventPopularityMultiplier) + 1;

    return event.private || segments === 1
      ? GlobalVariable.EventPopularityMin
      : segments * 0.1;
  }

  /*
      Event Score (10)
          - Event Is Upcoming Score (notifyComplete, timeNotify, timeStart)
    */
  public static scoreEventUpcoming(event: Event, nowInMillis: number): number {
    const timeStart: number = event.timeStart.toDate().getTime();

    const millisDiff: number = timeStart - nowInMillis;
    const segments: number = Math.floor(
      millisDiff / GlobalVariable.EventRecentlyAddedSegmentMillis
    );

    return event.notifyComplete
      ? GlobalVariable.EventUpcomingMin
      : (10 - segments) * 0.1;
  }

  public static cityInfo(city: City): CityInformation {
    const nearby: Record<string, number> = city.nearby;
    const cityInfo: CityInformation = {
      subscriberMax: 0,
      interests: [],
      distanceScore: {},
      nearby
    };

    Object.keys(nearby).forEach(
      (cityId: string) =>
        (cityInfo.distanceScore[cityId] = ServiceStreams.scoreCityDistance(
          nearby[cityId]
        ))
    );

    return cityInfo;
  }

  public static async citiesInfo(
    database: Firestore
  ): Promise<Record<string, CityInformation>> {
    const cityInfo: Record<string, CityInformation> = {};
    const cities: QuerySnapshot = await database
      .collection(Collection.Cities)
      .get();

    cities.forEach(
      (snapshot: QueryDocumentSnapshot) =>
        (cityInfo[snapshot.id] = ServiceStreams.cityInfo(
          snapshot.data() as City
        ))
    );

    return cityInfo;
  }

  public static async interestsInfo(
    database: Firestore
  ): Promise<Record<string, InterestInformation>> {
    const interestInfo: Record<string, InterestInformation> = {};
    const interests: QuerySnapshot = await database
      .collection(Collection.Interests)
      .where('private', '==', false)
      .get();

    let id: string;
    let interest: Interest;

    interests.forEach((snapshot: QueryDocumentSnapshot) => {
      interest = snapshot.data() as Interest;
      id = snapshot.id;
      interestInfo[id] = {
        subscribers: interest.subscriberCount,
        virtual: interest.virtual,
        cityEvents: {}
      };
    });

    return interestInfo;
  }

  public static async eventsInfo(
    database: Firestore,
    interests: Record<string, InterestInformation>,
    cities: Record<string, CityInformation>
  ): Promise<Record<string, EventInformation>> {
    const time: number = new Date().getTime();

    let id: string;
    let city: CityInfo;
    let cityId: string;
    let event: Event;
    let interestInfo: InterestInformation;
    let subscriberCount: number;

    const eventsInfo: Record<string, EventInformation> = {};
    const events: QuerySnapshot = await database
      .collection(Collection.Events)
      .where('private', '==', false)
      .get();

    // Process and save all events
    events.forEach((snapshot: QueryDocumentSnapshot) => {
      id = snapshot.id;
      event = snapshot.data() as Event;
      eventsInfo[id] = { score: ServiceStreams.scoreEvent(event, time) };
      city = event.city;

      if (city != null) {
        cityId = city.id;

        event.interests
          .filter(
            (interestId: string) => interests[interestId].cityEvents != null
          )
          .forEach((interestId: string) => {
            interestInfo = interests[interestId];
            subscriberCount = interestInfo.subscribers;

            interestInfo.cityEvents[cityId] =
              interestInfo.cityEvents?.[cityId] || [];

            if (subscriberCount > cities[cityId].subscriberMax) {
              cities[cityId].subscriberMax = subscriberCount;
            }

            interestInfo.cityEvents[cityId].push(id);
            cities[cityId].interests.push(interestId);
          });
      }
    });

    return eventsInfo;
  }

  public static interestStreams(
    interests: Record<string, InterestInformation>,
    cities: Record<string, CityInformation>,
    events: Record<string, EventInformation>
  ): Record<string, Record<string, StreamInterest>> {
    const interestStreams: Record<string, Record<string, StreamInterest>> = {};

    let score: number;
    let interestScore: number;
    let subscriberMax: number;
    let subscriberCount: number;
    let distanceScores: Record<string, number>;
    let cityInfo: CityInformation;
    let interestInfo: InterestInformation;
    let cityEvents: Record<string, Array<string>>;
    let cityStream: Record<string, StreamInterest>;

    // Process all cities and cities nearby
    Object.keys(cities).forEach((cityId: string) => {
      cityInfo = cities[cityId];
      distanceScores = cityInfo.distanceScore;
      cityStream = {};
      subscriberMax = cityInfo.subscriberMax === 0 ? 1 : cityInfo.subscriberMax;

      Object.keys(cityInfo.nearby).forEach((nearbyId: string) => {
        cities[nearbyId].interests.forEach((interestId: string) => {
          interestInfo = interests[interestId];
          subscriberCount = interestInfo.subscribers;
          cityEvents = interestInfo.cityEvents;
          interestScore = 0;

          Object.keys(cityEvents).forEach((cityIdEvent: string) => {
            cityEvents[cityIdEvent].forEach(
              (eventId: string) => (interestScore += events[eventId].score)
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
            virtual: interestInfo.virtual
          } as StreamInterest;
        });
      });

      interestStreams[cityId] = cityStream;
    });

    return interestStreams;
  }

  public static async generateStream(
    database: Firestore,
    city: City
  ): Promise<any> {
    const debugDoc: DocumentReference = database
      .collection(Collection.Debug)
      .doc('stream-city');
    const debug: boolean = true;
    const citiesNearby: Record<string, number> = city.nearby;
    const cityIdsNearby: Array<string> = Object.keys(citiesNearby);
    const eventScores: Record<string, number> = {};
    const interestSubscribers: Record<string, number> = {};
    const cityInterests: Record<string, Array<string>> = {};
    const distanceScores: Record<string, number> = {};
    const interestCityEvents: Record<
      string,
      Record<string, Array<string>>
    > = {};
    const interestCollection: CollectionReference = database.collection(
      Collection.Interests
    );
    const eventCollection: CollectionReference = database.collection(
      Collection.Events
    );
    const eventQuery: Array<Promise<QuerySnapshot>> = [];
    const interestQuery: Array<Promise<QuerySnapshot>> = [];
    const interestIds: Record<string, string> = {};
    const events: Array<Event> = [];
    const stream: Record<string, StreamInterest> = {};

    let id: string;
    let cityId: string;
    let event: Event;
    let subscriberMax: number = 0;
    let subscriberCount: number;

    cityIdsNearby.forEach((nearbyId: string) =>
      eventQuery.push(eventCollection.where('cityId', '==', nearbyId).get())
    );

    const eventSnapshots: Array<QuerySnapshot> = await Promise.all(eventQuery);
    const time: number = new Date().getTime();

    eventSnapshots.forEach((query: QuerySnapshot) =>
      query.forEach((snapshot: QueryDocumentSnapshot) => {
        id = snapshot.id;
        event = snapshot.data() as Event;

        event.interests.forEach(
          (interestId: string) => (interestIds[interestId] = interestId)
        );

        events.push(event);
      })
    );

    Object.keys(interestIds).forEach((interestId: string) =>
      interestQuery.push(interestCollection.where('id', '==', interestId).get())
    );

    const interestSnapshots: Array<QuerySnapshot> = await Promise.all(
      interestQuery
    );

    interestSnapshots.forEach((query: QuerySnapshot) =>
      query.forEach((snapshot: QueryDocumentSnapshot) => {
        id = snapshot.id;
        interestSubscribers[id] = (snapshot.data() as Interest).subscriberCount;
        interestCityEvents[id] = {};
      })
    );

    cityIdsNearby.forEach((cityId: string) => {
      cityInterests[cityId] = [];
      distanceScores[cityId] = ServiceStreams.scoreCityDistance(
        citiesNearby[cityId]
      );
    });

    events.forEach((event: Event) => {
      id = event.id;
      eventScores[id] = ServiceStreams.scoreEvent(event, time);
      cityId = event.city.id;

      event.interests
        .filter((interestId: string) => interestCityEvents[interestId] != null)
        .forEach((interestId: string) => {
          subscriberCount = interestSubscribers[interestId];

          if (interestCityEvents[interestId][cityId] == null) {
            interestCityEvents[interestId][cityId] = [];
          }

          if (subscriberCount > subscriberMax) {
            subscriberMax = subscriberCount;
          }

          interestCityEvents[interestId][cityId].push(id);
          cityInterests[cityId].push(interestId);
        });
    });

    let score: number;
    let interestScore: number;
    let cityEvents: Record<string, Array<string>>;

    cityId = city.id;
    subscriberMax = subscriberMax === 0 ? 1 : subscriberMax;

    cityIdsNearby.forEach((nearbyId: string) => {
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

        stream[interestId] = { score } as StreamInterest;
      });
    });

    if (debug) {
      await debugDoc.set({
        citiesNearby,
        cityInterests,
        distanceScores,
        subscriberMax,
        interestCityEvents,
        interestSubscribers,
        eventScores
      });
    }

    return database.collection(Collection.Streams).doc(cityId).set(stream);
  }
}
