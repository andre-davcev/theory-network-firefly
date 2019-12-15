import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, ServiceCities } from '../library';

const database: Firestore = db();

const CitiesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('cities/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Record<string, any> = ServiceFirestore.create(snapshot, { version: Version.Cities });

    const id:       string                      = object.id;
    const geopoint: db.GeoPoint                 = object.geopoint;
    const promises: Array<Promise<WriteResult>> = [];
    const cities:   db.QuerySnapshot            = await database.collection('cities').get();
    const nearby:   Record<string, number>      = {};

    cities.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        const city:     Record<string, any> = snapshot.data();
        const distance: number              = ServiceCities.distanceBetweenPoints(geopoint, city.geopoint);

        if (distance <= ServiceCities.threshold)
        {
            nearby[city.id] = distance;
            city.nearby[id] = distance;

            promises.push(snapshot.ref.update({ nearby: city.nearby }));
        }
    });

    object.nearby = nearby;

    promises.push(snapshot.ref.update(object));
)
/*
    for each city
        get distance to city in km ServiceCity.distanceBetweenPoints
        filter out cities above km threshold (200km)
        city.nearby[city.id] = distanceKm
    update city object
    update fkCity.nearby[city.id] = distanceKm
*/

    return snapshot.ref.update(object);
});

export { CitiesCreate };

