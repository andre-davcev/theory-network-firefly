import {
  CollectionReference,
  Firestore,
  Query,
  QuerySnapshot,
  WriteResult
} from '@google-cloud/firestore';
import { Timestamp } from 'firebase/firestore';

import {
  City,
  CityInfo,
  Collection,
  Event,
  Interest,
  StreamInterest
} from '../../shared';
import { GlobalVariable } from '../enums';
import { ServiceFirestore } from './firestore.service';

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

  public static citiesInfo(
    cities: Array<City>
  ): Record<string, CityInformation> {
    const cityInfo: Record<string, CityInformation> = {};

    cities.forEach(
      (city: City) => (cityInfo[city.id] = ServiceStreams.cityInfo(city))
    );

    return cityInfo;
  }

  public static interestsInfo(
    interests: Array<Interest>
  ): Record<string, InterestInformation> {
    const interestInfo: Record<string, InterestInformation> = {};

    interests.forEach(
      (interest: Interest) =>
        (interestInfo[interest.id] = {
          subscribers: interest.subscriberCount,
          virtual: interest.virtual,
          cityEvents: {}
        })
    );

    return interestInfo;
  }

  public static eventsInfo(
    events: Array<Event>,
    interests: Record<string, InterestInformation>,
    cities: Record<string, CityInformation>
  ): Record<string, EventInformation> {
    const time: number = new Date().getTime();

    let id: string;
    let city: CityInfo;
    let cityId: string;
    let interestInfo: InterestInformation;
    let subscriberCount: number;

    const eventsInfo: Record<string, EventInformation> = {};

    // Process and save all events
    events.forEach((event: Event) => {
      id = event.id;
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

  public static async streamsCreate(
    database: Firestore
  ): Promise<Array<WriteResult>> {
    // Get cities information
    const citiesQuery: Query = database.collection(Collection.Cities);
    const cities: Array<City> = await ServiceFirestore.toArrayQuery<City>(
      citiesQuery
    );
    const citiesInfo: Record<string, CityInformation> =
      ServiceStreams.citiesInfo(cities);

    // Get interests information
    const interestsQuery: Query = database
      .collection(Collection.Interests)
      .where('private', '==', false);
    const interests: Array<Interest> =
      await ServiceFirestore.toArrayQuery<Interest>(interestsQuery);
    const interestsInfo: Record<string, InterestInformation> =
      ServiceStreams.interestsInfo(interests);

    // Get events information
    const eventsQuery: Query = database
      .collection(Collection.Events)
      .where('private', '==', false);
    const events: Array<Event> = await ServiceFirestore.toArrayQuery<Event>(
      eventsQuery
    );
    const eventsInfo: Record<string, EventInformation> =
      ServiceStreams.eventsInfo(events, interestsInfo, citiesInfo);

    // Generate stream for cities and cities nearby
    const collection: CollectionReference = database.collection(
      Collection.Streams
    );
    const interestStreams: Record<
      string,
      Record<string, StreamInterest>
    > = ServiceStreams.interestStreams(interestsInfo, citiesInfo, eventsInfo);
    const updates: Array<Promise<WriteResult>> = Object.keys(
      interestStreams
    ).map((cityId: string) =>
      collection.doc(cityId).set(interestStreams[cityId])
    );

    await ServiceFirestore.debugWrite(false, database, Collection.Streams, {
      citiesInfo,
      interestsInfo,
      eventsInfo,
      interestStreams
    });

    return Promise.all(updates);
  }

  public static async streamCreate(
    database: Firestore,
    city: City
  ): Promise<Array<WriteResult>> {
    // Get cities information
    const cityId: string = city.id;
    const cityIds: Array<string> = Object.keys(city.nearby).filter(
      (nearbyId: string) => cityId !== nearbyId
    );
    const citiesQuery: Array<Promise<QuerySnapshot>> = cityIds.map(
      (cityId: string) =>
        database.collection(Collection.Cities).where('id', '==', cityId).get()
    );
    const cities: Array<City> =
      await ServiceFirestore.toArrayQuerySnapshots<City>(citiesQuery);
    cities.push(city);
    const citiesInfo: Record<string, CityInformation> =
      ServiceStreams.citiesInfo(cities);

    // Get events
    const eventsQuery: Array<Promise<QuerySnapshot>> = Object.keys(
      city.nearby
    ).map((cityId: string) =>
      database.collection(Collection.Events).where('cityId', '==', cityId).get()
    );
    const eventsAll: Array<Event> =
      await ServiceFirestore.toArrayQuerySnapshots<Event>(eventsQuery);
    const events: Array<Event> = eventsAll.filter(
      (event: Event) => !event.private
    );

    // Get interest info
    const interestIds: Record<string, string> = {};
    events.forEach((event: Event) =>
      event.interests.forEach(
        (interestId: string) => (interestIds[interestId] = interestId)
      )
    );
    const interestsQuery: Array<Promise<QuerySnapshot>> = Object.keys(
      interestIds
    ).map((interestId: string) =>
      database
        .collection(Collection.Interests)
        .where('id', '==', interestId)
        .get()
    );
    const interestsAll: Array<Interest> =
      await ServiceFirestore.toArrayQuerySnapshots<Interest>(interestsQuery);
    const interests: Array<Interest> = interestsAll.filter(
      (interest: Interest) => !interest.private
    );
    const interestsInfo: Record<string, InterestInformation> =
      ServiceStreams.interestsInfo(interests);

    // Get event info
    const eventsInfo: Record<string, EventInformation> =
      ServiceStreams.eventsInfo(events, interestsInfo, citiesInfo);

    // Generate stream for cities and cities nearby
    const collection: CollectionReference = database.collection(
      Collection.Streams
    );

    await ServiceFirestore.debugWrite(
      true,
      database,
      `${Collection.Streams}-city`,
      {
        cityIds,
        citiesInfo,
        interestsInfo,
        eventsInfo
      }
    );
    const interestStreams: Record<
      string,
      Record<string, StreamInterest>
    > = ServiceStreams.interestStreams(interestsInfo, citiesInfo, eventsInfo);
    const updates: Array<Promise<WriteResult>> = [
      collection.doc(cityId).set(interestStreams[cityId])
    ];

    await ServiceFirestore.debugWrite(
      false,
      database,
      `${Collection.Streams}-city`,
      {
        citiesInfo,
        interestsInfo,
        eventsInfo,
        interestStreams
      }
    );

    return Promise.all(updates);
  }
}
