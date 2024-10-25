import {
  CollectionReference,
  Firestore,
  Query,
  QuerySnapshot,
  WriteResult
} from '@google-cloud/firestore';
import { Timestamp } from 'firebase-admin/firestore';

import {
  City,
  CityInfo,
  Collection,
  Event,
  List,
  StreamList
} from '../../shared';
import { GlobalVariable } from '../enums';
import { ServiceFirestore } from './firestore.service';

export interface CityInformation {
  lists: Array<string>;
  subscriberMax: number;
  distanceScore: Record<string, number>;
  nearby: Record<string, number>;
}

export interface ListInformation {
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
    const listCount: number = event.lists.length;
    const segments: number =
      Math.floor(listCount / GlobalVariable.EventPopularityMultiplier) + 1;

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
      lists: [],
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

  public static listsInfo(lists: Array<List>): Record<string, ListInformation> {
    const listInfo: Record<string, ListInformation> = {};

    lists.forEach(
      (list: List) =>
        (listInfo[list.id] = {
          subscribers: list.subscriberCount,
          virtual: list.virtual,
          cityEvents: {}
        })
    );

    return listInfo;
  }

  public static eventsInfo(
    events: Array<Event>,
    lists: Record<string, ListInformation>,
    cities: Record<string, CityInformation>
  ): Record<string, EventInformation> {
    const time: number = new Date().getTime();

    let id: string;
    let city: CityInfo;
    let cityId: string;
    let listInfo: ListInformation;
    let subscriberCount: number;

    const eventsInfo: Record<string, EventInformation> = {};

    // Process and save all events
    events.forEach((event: Event) => {
      id = event.id;
      eventsInfo[id] = { score: ServiceStreams.scoreEvent(event, time) };
      city = event.city;

      if (city != null) {
        cityId = city.id;

        event.lists
          .filter((listId: string) => lists[listId].cityEvents != null)
          .forEach((listId: string) => {
            listInfo = lists[listId];
            subscriberCount = listInfo.subscribers;

            listInfo.cityEvents[cityId] = listInfo.cityEvents?.[cityId] || [];

            if (subscriberCount > cities[cityId].subscriberMax) {
              cities[cityId].subscriberMax = subscriberCount;
            }

            listInfo.cityEvents[cityId].push(id);
            cities[cityId].lists.push(listId);
          });
      }
    });

    return eventsInfo;
  }

  public static listStreams(
    lists: Record<string, ListInformation>,
    cities: Record<string, CityInformation>,
    events: Record<string, EventInformation>
  ): Record<string, Record<string, StreamList>> {
    const listStreams: Record<string, Record<string, StreamList>> = {};

    let score: number;
    let listScore: number;
    let subscriberMax: number;
    let subscriberCount: number;
    let distanceScores: Record<string, number>;
    let cityInfo: CityInformation;
    let listInfo: ListInformation;
    let cityEvents: Record<string, Array<string>>;
    let cityStream: Record<string, StreamList>;

    // Process all cities and cities nearby
    Object.keys(cities).forEach((cityId: string) => {
      cityInfo = cities[cityId];
      distanceScores = cityInfo.distanceScore;
      cityStream = {};
      subscriberMax = cityInfo.subscriberMax === 0 ? 1 : cityInfo.subscriberMax;

      Object.keys(cityInfo.nearby).forEach((nearbyId: string) => {
        cities[nearbyId].lists.forEach((listId: string) => {
          listInfo = lists[listId];
          subscriberCount = listInfo.subscribers;
          cityEvents = listInfo.cityEvents;
          listScore = 0;

          Object.keys(cityEvents).forEach((cityIdEvent: string) => {
            cityEvents[cityIdEvent].forEach(
              (eventId: string) => (listScore += events[eventId].score)
            );

            listScore += listScore * distanceScores[cityIdEvent];
          });

          score =
            listScore * GlobalVariable.ListScoreWeightRaw +
            listScore *
              GlobalVariable.ListScoreWeightSubscribers *
              (subscriberCount / subscriberMax);

          cityStream[listId] = {
            score,
            virtual: listInfo.virtual
          } as StreamList;
        });
      });

      listStreams[cityId] = cityStream;
    });

    return listStreams;
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

    // Get lists information
    const listsQuery: Query = database
      .collection(Collection.Lists)
      .where('private', '==', false);
    const lists: Array<List> = await ServiceFirestore.toArrayQuery<List>(
      listsQuery
    );
    const listsInfo: Record<string, ListInformation> =
      ServiceStreams.listsInfo(lists);

    // Get events information
    const eventsQuery: Query = database
      .collection(Collection.Events)
      .where('private', '==', false);
    const events: Array<Event> = await ServiceFirestore.toArrayQuery<Event>(
      eventsQuery
    );
    const eventsInfo: Record<string, EventInformation> =
      ServiceStreams.eventsInfo(events, listsInfo, citiesInfo);

    // Generate stream for cities and cities nearby
    const collection: CollectionReference = database.collection(
      Collection.ListStreams
    );
    const listStreams: Record<
      string,
      Record<string, StreamList>
    > = ServiceStreams.listStreams(listsInfo, citiesInfo, eventsInfo);
    const updates: Array<Promise<WriteResult>> = Object.keys(listStreams).map(
      (cityId: string) => collection.doc(cityId).set(listStreams[cityId])
    );

    await ServiceFirestore.debugWrite(false, database, Collection.ListStreams, {
      citiesInfo,
      listsInfo,
      eventsInfo,
      listStreams
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

    // Get list info
    const listIds: Record<string, string> = {};
    events.forEach((event: Event) =>
      event.lists.forEach((listId: string) => (listIds[listId] = listId))
    );
    const listsQuery: Array<Promise<QuerySnapshot>> = Object.keys(listIds).map(
      (listId: string) =>
        database.collection(Collection.Lists).where('id', '==', listId).get()
    );
    const listsAll: Array<List> =
      await ServiceFirestore.toArrayQuerySnapshots<List>(listsQuery);
    const lists: Array<List> = listsAll.filter((list: List) => !list.private);
    const listsInfo: Record<string, ListInformation> =
      ServiceStreams.listsInfo(lists);

    // Get event info
    const eventsInfo: Record<string, EventInformation> =
      ServiceStreams.eventsInfo(events, listsInfo, citiesInfo);

    // Generate stream for cities and cities nearby
    const collection: CollectionReference = database.collection(
      Collection.ListStreams
    );

    await ServiceFirestore.debugWrite(
      true,
      database,
      `${Collection.ListStreams}-city`,
      {
        cityIds,
        citiesInfo,
        listsInfo,
        eventsInfo
      }
    );
    const listStreams: Record<
      string,
      Record<string, StreamList>
    > = ServiceStreams.listStreams(listsInfo, citiesInfo, eventsInfo);
    const updates: Array<Promise<WriteResult>> = [
      collection.doc(cityId).set(listStreams[cityId])
    ];

    await ServiceFirestore.debugWrite(
      false,
      database,
      `${Collection.ListStreams}-city`,
      {
        citiesInfo,
        listsInfo,
        eventsInfo,
        listStreams
      }
    );

    return Promise.all(updates);
  }
}
