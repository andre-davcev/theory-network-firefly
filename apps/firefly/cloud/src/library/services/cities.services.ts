import { WriteResult, Firestore, DocumentSnapshot, QuerySnapshot, QueryDocumentSnapshot, CollectionReference } from '@google-cloud/firestore';
import { firestore } from 'firebase-admin';
import { Location } from '../models';
import { Event, User, StreamInterest, Interest, City } from '../documents';
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
        const debugDoc            : firestore.DocumentReference                   = database.collection('debug').doc('stream-city');
        const debug               : boolean                                       = true
        const citiesNearby        : Record<string, number>                        = city.nearby;
        const cityIdsNearby       : Array<string>                                 = Object.keys(citiesNearby);
        const eventScores         : Record<string, number>                        = {};
        const interestSubscribers : Record<string, number>                        = {};
        const cityInterests       : Record<string, Array<string>>                 = {};
        const distanceScores      : Record<string, number>                        = {};
        const interestCityEvents  : Record<string, Record<string, Array<string>>> = {};
        const interestCollection  : CollectionReference                           = database.collection('clusters');
        const eventCollection     : CollectionReference                           = database.collection('events');
        const eventQuery          : Array<Promise<QuerySnapshot>>                 = [];
        const interestQuery       : Array<Promise<QuerySnapshot>>                 = [];
        const interestIds         : Record<string, string>                        = {};
        const events              : Array<Event>                                  = [];
        const stream              : Record<string, StreamInterest>                 = {};

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

                event.interests.forEach((interestId: string) =>
                    interestIds[interestId] = interestId
                );

                events.push(event);
            })
        );

        Object.keys(interestIds).forEach((interestId: string) =>
            interestQuery.push(interestCollection.where('id', '==', interestId).get())
        );

        const interestSnapshots : Array<QuerySnapshot> = await Promise.all(interestQuery);

        interestSnapshots.forEach((query: QuerySnapshot) =>
            query.forEach((snapshot: QueryDocumentSnapshot) =>
            {
                id                     = snapshot.id;
                interestSubscribers[id] = (snapshot.data() as Interest).subscriberCount;
                interestCityEvents[id]  = {};
            })
        );

        cityIdsNearby.forEach((cityId: string) =>
        {
            cityInterests[cityId]   = [];
            distanceScores[cityId] = ServiceStreams.scoreCityDistance(citiesNearby[cityId])
        });

        events.forEach((event: Event) =>
        {
            id              = event.id;
            eventScores[id] = ServiceStreams.scoreEvent(event, nowInMillis);
            cityId          = event.cityId;

            event.interests.forEach((interestId: string) =>
            {
                subscriberCount = interestSubscribers[interestId];

                if (interestCityEvents[interestId][cityId] == null)
                {
                    interestCityEvents[interestId][cityId] = [];
                }

                if (subscriberCount > subscriberMax)
                {
                    subscriberMax = subscriberCount;
                }

                interestCityEvents[interestId][cityId].push(id);
                cityInterests[cityId].push(interestId);
            });
        });

        let score         : number;
        let interestScore : number;
        let cityEvents    : Record<string, Array<string>>;

        cityId         = city.id;
        subscriberMax  = subscriberMax === 0 ? 1 : subscriberMax;

        cityIdsNearby.forEach((nearbyId: string) =>
        {
            cityInterests[nearbyId].forEach((interestId: string) =>
            {
                subscriberCount = interestSubscribers[interestId];
                cityEvents      = interestCityEvents[interestId];
                interestScore    = 0;

                Object.keys(cityEvents).forEach((cityIdEvent: string) =>
                {
                    cityEvents[cityIdEvent].forEach((eventId: string) =>
                        interestScore += eventScores[eventId]
                    );

                    interestScore += (interestScore * distanceScores[cityIdEvent]);
                });

                score = (interestScore * GlobalVariable.InterestScoreWeightRaw) +
                        (interestScore * GlobalVariable.InterestScoreWeightSubscribers * (subscriberCount / subscriberMax));

                stream[interestId] = { score } as StreamInterest;
            });
        });

        if (debug)
        {
            await debugDoc.set
            ({
                citiesNearby,
                cityInterests,
                distanceScores,
                subscriberMax,
                interestCityEvents,
                interestSubscribers,
                eventScores
            });
        }

        return database.collection('streams').doc(cityId).set(stream);
    }
}
