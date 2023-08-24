import {
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@google-cloud/firestore';
import { City, Collection } from '../../shared';
import { ServiceStreams } from './stream.service';

export interface CityInformation {
  interests: Array<string>;
  subscriberMax: number;
  distanceScore: Record<string, number>;
  nearby: Record<string, number>;
}

export class InterestsService {
  public static async citiesInfoGet(
    database: Firestore
  ): Promise<Record<string, CityInformation>> {
    const cityInformation: Record<string, CityInformation> = {};
    const cities: QuerySnapshot = await database
      .collection(Collection.Cities)
      .get();

    let id: string;
    let nearby: Record<string, number>;

    cities.forEach((snapshot: QueryDocumentSnapshot) => {
      id = snapshot.id;
      nearby = (snapshot.data() as City).nearby;

      cityInformation[id] = {
        subscriberMax: 0,
        interests: [],
        distanceScore: {},
        nearby
      };

      Object.keys(nearby).forEach(
        (cityId: string) =>
          (cityInformation[id].distanceScore[cityId] =
            ServiceStreams.scoreCityDistance(nearby[cityId]))
      );
    });

    return cityInformation;
  }
}
