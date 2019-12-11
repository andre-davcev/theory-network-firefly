import { WriteResult, Firestore, DocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

export class ServiceCities
{
    public static async createIfNew(database: Firestore, city: Record<string, any>): Promise<WriteResult>
    {
        const cityDoc: DocumentSnapshot = await database.collection('cities').doc(city.cityId).get();

        return cityDoc.exists ?
            null :
            cityDoc.ref.create
            ({
                geopoint:  city.geopoint,
                city:      city.city,
                region:    city.region,
                country:   city.country,
                nearby:    [],

                clusters :
                {
                    [city.clusters[0]]:
                    {
                        events: 1,
                        total:  1,
                        ratio:  1
                    }
                }
            });
    }
}
