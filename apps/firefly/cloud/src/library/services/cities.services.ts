import { WriteResult, Firestore, DocumentSnapshot } from '@google-cloud/firestore';
import { firestore } from 'firebase-admin';
import { Event, User } from '../documents';
import { Location } from '../models';

export class ServiceCities
{
    private static earthRadius: number = 6371;

    public static distanceBetweenPoints(geopoint1: firestore.GeoPoint, geopoint2: firestore.GeoPoint)
    {
        return ServiceCities.distanceBetween(geopoint1.latitude, geopoint1.longitude, geopoint2.latitude, geopoint2.longitude);
    }

    public static async createIfNew(database: Firestore, document: Event | User): Promise<WriteResult>
    {
        const location: Location         = document.city;
        const cityDoc:  DocumentSnapshot = await database.collection('cities').doc(location.cityId).get();

        if (cityDoc.exists) { return null; }

        return cityDoc.ref.create
        ({
            geopoint:  location.geopoint,
            city:      location.city,
            region:    location.region,
            country:   location.country,

            nearby: {}
        });
    }

    private static degrees2Radians(degrees: number): number
    {
        return degrees * (Math.PI / 180);
    }

    private static distanceBetween(latitude1: number, longitude1: number, latitude2: number, longitude2: number)
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
