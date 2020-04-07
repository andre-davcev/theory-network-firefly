import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, ServiceCities, GlobalVariable, City, Collection } from '../library';

const database: Firestore = db();

const CitiesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('cities/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: City = ServiceFirestore.create<City>(snapshot, Version.Cities);

    const id:       string                      = object.id;
    const geopoint: db.GeoPoint                 = object.geopoint;
    const promises: Array<Promise<WriteResult>> = [];
    const cities:   db.QuerySnapshot            = await database.collection(Collection.Cities).get();
    const nearby:   Record<string, number>      = { [id]: 0 };

    cities.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        const city: City = snapshot.data() as City;

        if (id !== snapshot.id)
        {
            const distance: number = ServiceCities.distanceBetweenPoints(geopoint, city.geopoint);

            if (distance <= GlobalVariable.DistanceThreshold)
            {
                nearby[city.id] = distance;
                city.nearby[id] = distance;

                promises.push(snapshot.ref.update({ nearby: city.nearby }));
            }
        }
    });

    object.nearby = nearby;
    object.userId = GlobalVariable.UserAdmin;

    return Promise.all
    ([
        snapshot.ref.update(object),
        ServiceCities.generateStream(database, object)
    ]);
});

export { CitiesCreate };

