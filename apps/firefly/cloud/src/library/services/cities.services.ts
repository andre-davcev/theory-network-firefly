import { WriteResult, Firestore, DocumentSnapshot, QuerySnapshot, QueryDocumentSnapshot, CollectionReference } from '@google-cloud/firestore';
import { firestore } from 'firebase-admin';
import { Location } from '../models';
import { Event, User, StreamCluster, Cluster, City } from '../documents';
import { ServiceStreams } from './stream.service';
import { GlobalVariable } from '../enums';

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

    public static async generateStream(database: Firestore, city: City): Promise<any>
    {
        const debugDoc           : firestore.DocumentReference                   = database.collection('debug').doc('stream-city');
        const debug              : boolean                                       = true
        const citiesNearby       : Record<string, number>                        = city.nearby;
        const cityIdsNearby      : Array<string>                                 = Object.keys(citiesNearby);
        const eventScores        : Record<string, number>                        = {};
        const clusterSubscribers : Record<string, number>                        = {};
        const cityClusters       : Record<string, Array<string>>                 = {};
        const distanceScores     : Record<string, number>                        = {};
        const clusterCityEvents  : Record<string, Record<string, Array<string>>> = {};
        const clusterCollection  : CollectionReference                           = database.collection('clusters');
        const eventCollection    : CollectionReference                           = database.collection('events');
        const eventQuery         : Array<Promise<QuerySnapshot>>                 = [];
        const clusterQuery       : Array<Promise<QuerySnapshot>>                 = [];
        const clusterIds         : Record<string, string>                        = {};
        const events             : Array<Event>                                  = [];
        const stream             : Record<string, StreamCluster>                 = {};

        let id              : string;
        let cityId          : string;
        let event           : Event;
        let subscriberMax   : number = 0;
        let subscriberCount : number;

        cityIdsNearby.forEach((nearbyId: string) =>
            eventQuery.push(eventCollection.where('cityId', '==', nearbyId).get())
        );

        const eventSnapshots : Array<QuerySnapshot> = await Promise.all(eventQuery);
        const nowInMillis    : number               = (new Date()).getMilliseconds();

        eventSnapshots.forEach((query: QuerySnapshot) =>
            query.forEach((snapshot: QueryDocumentSnapshot) =>
            {
                id    = snapshot.id;
                event = snapshot.data() as Event;

                event.clusters.forEach((clusterId: string) =>
                    clusterIds[clusterId] = clusterId
                );

                events.push(event);
            })
        );

        Object.keys(clusterIds).forEach((clusterId: string) =>
            clusterQuery.push(clusterCollection.where('id', '==', clusterId).get())
        );

        const clusterSnapshots : Array<QuerySnapshot> = await Promise.all(clusterQuery);

        clusterSnapshots.forEach((query: QuerySnapshot) =>
            query.forEach((snapshot: QueryDocumentSnapshot) =>
            {
                id                     = snapshot.id;
                clusterSubscribers[id] = (snapshot.data() as Cluster).subscriberCount;
                clusterCityEvents[id]  = {};
            })
        );

        cityIdsNearby.forEach((cityId: string) =>
        {
            cityClusters[cityId]   = [];
            distanceScores[cityId] = ServiceStreams.scoreCityDistance(citiesNearby[cityId])
        });

        events.forEach((event: Event) =>
        {
            id              = event.id;
            eventScores[id] = ServiceStreams.scoreEvent(event, nowInMillis);
            cityId          = event.cityId;

            event.clusters.forEach((clusterId: string) =>
            {
                subscriberCount = clusterSubscribers[clusterId];

                if (clusterCityEvents[clusterId][cityId] == null)
                {
                    clusterCityEvents[clusterId][cityId] = [];
                }

                if (subscriberCount > subscriberMax)
                {
                    subscriberMax = subscriberCount;
                }

                clusterCityEvents[clusterId][cityId].push(id);
                cityClusters[cityId].push(clusterId);
            });
        });

        let score        : number;
        let clusterScore : number;
        let cityEvents   : Record<string, Array<string>>;

        cityId         = city.id;
        subscriberMax  = subscriberMax === 0 ? 1 : subscriberMax;

        cityIdsNearby.forEach((nearbyId: string) =>
        {
            cityClusters[nearbyId].forEach((clusterId: string) =>
            {
                subscriberCount = clusterSubscribers[clusterId];
                cityEvents      = clusterCityEvents[clusterId];
                clusterScore    = 0;

                Object.keys(cityEvents).forEach((cityIdEvent: string) =>
                {
                    cityEvents[cityIdEvent].forEach((eventId: string) =>
                        clusterScore += eventScores[eventId]
                    );

                    clusterScore += (clusterScore * distanceScores[cityIdEvent]);
                });

                score = (clusterScore * GlobalVariable.ClusterScoreWeightRaw) +
                        (clusterScore * GlobalVariable.ClusterScoreWeightSubscribers * (subscriberCount / subscriberMax));

                stream[clusterId] = { score } as StreamCluster;
            });
        });

        if (debug)
        {
            await debugDoc.set
            ({
                citiesNearby,
                cityClusters,
                distanceScores,
                subscriberMax,
                clusterCityEvents,
                clusterSubscribers,
                eventScores
            });
        }

        return database.collection('streams').doc(cityId).set(stream);
    }
}
