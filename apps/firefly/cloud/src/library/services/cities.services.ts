import { WriteResult, Firestore, DocumentSnapshot } from '@google-cloud/firestore';

export class ServiceCities
{
    public static async createIfNew(database: Firestore, event: Record<string, any>): Promise<WriteResult>
    {
        const city:         Record<string, any> = event.city;
        const clustersList: Array<string>       = event.clusters;
        const cityDoc:      DocumentSnapshot    = await database.collection('cities').doc(city.cityId).get();

        if (cityDoc.exists) { return null; }

        const clusters: Record<string, any> = {};

        clustersList.forEach((clusterId: string) =>
            clusters[clusterId] =
            {
                events: 1,
                total:  1,
                ratio:  1
            }
        );

        return cityDoc.ref.create
        ({
            geopoint:  city.geopoint,
            city:      city.city,
            region:    city.region,
            country:   city.country,
            nearby:    [],

            clusters,
            clustersList
        });
    }
}
