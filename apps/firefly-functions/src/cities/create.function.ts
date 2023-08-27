import {
  DocumentSnapshot,
  Firestore,
  QueryDocumentSnapshot,
  WriteResult
} from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { CloudFunction, EventContext, firestore } from 'firebase-functions';
import { GeoPoint } from 'firebase/firestore';

import {
  GlobalVariable,
  ServiceCities,
  ServiceFirestore,
  ServiceStreams,
  Version
} from '../library';
import { City, Collection } from '../shared';

const database: Firestore = db();

const CitiesCreate: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Cities}/{id}`)
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const object: City = ServiceFirestore.create<City>(
      snapshot,
      Version.Cities
    );

    const id: string = object.id;
    const geopoint: GeoPoint = object.geopoint;
    const promises: Array<Promise<WriteResult>> = [];
    const cities: db.QuerySnapshot = await database
      .collection(Collection.Cities)
      .get();
    const nearby: Record<string, number> = { [id]: 0 };

    cities.forEach((snapshot: QueryDocumentSnapshot) => {
      const city: City = snapshot.data() as City;

      if (id !== snapshot.id) {
        const distance: number = ServiceCities.distanceBetweenPoints(
          geopoint,
          city.geopoint
        );

        if (distance <= GlobalVariable.DistanceThreshold) {
          nearby[city.id] = distance;
          city.nearby[id] = distance;

          promises.push(snapshot.ref.update({ nearby: city.nearby }));
        }
      }
    });

    object.nearby = nearby;
    object.userId = GlobalVariable.UserAdmin;

    return Promise.all([
      snapshot.ref.set(object),
      ServiceStreams.streamCreate(database, object)
    ]);
  });

export { CitiesCreate };
