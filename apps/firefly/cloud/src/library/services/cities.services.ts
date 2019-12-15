import { WriteResult, Firestore, DocumentSnapshot } from '@google-cloud/firestore';
import { firestore } from 'firebase-admin';

export class ServiceCities
{
    public static threshold: number = 200;

    private static earthRadius: number = 6371;

    public static distanceBetweenPoints(geopoint1: firestore.GeoPoint, geopoint2: firestore.GeoPoint)
    {
        return ServiceCities.distanceBetween(geopoint1.latitude, geopoint1.longitude, geopoint2.latitude, geopoint2.longitude);
    }

    public static async createIfNew(database: Firestore, event: Record<string, any>): Promise<WriteResult>
    {
        const city:         Record<string, any> = event.city;
        const clustersList: Array<string>       = event.clusters;
        const cityDoc:      DocumentSnapshot    = await database.collection('cities').doc(city.cityId).get();

        if (cityDoc.exists) { return null; }

        const clusterEvents: Record<string, number> = {};

        clustersList.forEach((clusterId: string) =>
            clusterEvents[clusterId] = 1
        );

        return cityDoc.ref.create
        ({
            geopoint:  city.geopoint,
            city:      city.city,
            region:    city.region,
            country:   city.country,

            nearby: [],
            clusterEvents,
            clustersList
        });
    }

    private static degrees2Radians(degrees: number): number
    {
        return degrees * (Math.PI / 180);
    }

    private static distanceBetween(latitude1, longitude1, latitude2, longitude2)
    {
        // Haversine Formula (KM)
        const distanceLatitude:  number = ServiceCities.degrees2Radians(latitude2  - latitude1);
        const distanceLongitude: number = ServiceCities.degrees2Radians(longitude2 - longitude1);
        const a: number = Math.sin(distanceLatitude/2) * Math.sin(distanceLatitude/2) +
                          Math.cos(ServiceCities.degrees2Radians(latitude1)) * Math.cos(ServiceCities.degrees2Radians(latitude2)) *
                          Math.sin(distanceLongitude/2) * Math.sin(distanceLongitude/2);
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ServiceCities.earthRadius * c;
    }
}
