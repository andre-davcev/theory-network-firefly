"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCities = void 0;
const stream_service_1 = require("./stream.service");
const enums_1 = require("../enums");
class ServiceCities {
    static distanceBetweenPoints(geopoint1, geopoint2) {
        return ServiceCities.distanceBetween(geopoint1.latitude, geopoint1.longitude, geopoint2.latitude, geopoint2.longitude);
    }
    static async createIfNew(database, document) {
        const info = document.city;
        const cityDoc = await database.collection(enums_1.Collection.Cities).doc(info.id).get();
        if (cityDoc.exists) {
            return null;
        }
        return cityDoc.ref.create(Object.assign(Object.assign({}, info), { nearby: {} }));
    }
    static degrees2Radians(degrees) {
        return degrees * (Math.PI / 180);
    }
    static distanceBetween(latitude1, longitude1, latitude2, longitude2) {
        // Haversine Formula (KM)
        const distanceLatitude = ServiceCities.degrees2Radians(latitude2 - latitude1);
        const distanceLongitude = ServiceCities.degrees2Radians(longitude2 - longitude1);
        const a = Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
            Math.cos(ServiceCities.degrees2Radians(latitude1)) * Math.cos(ServiceCities.degrees2Radians(latitude2)) *
                Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return ServiceCities.earthRadius * c;
    }
    static async generateStream(database, city) {
        const debugDoc = database.collection(enums_1.Collection.Debug).doc('stream-city');
        const debug = true;
        const citiesNearby = city.nearby;
        const cityIdsNearby = Object.keys(citiesNearby);
        const eventScores = {};
        const interestSubscribers = {};
        const cityInterests = {};
        const distanceScores = {};
        const interestCityEvents = {};
        const interestCollection = database.collection(enums_1.Collection.Interests);
        const eventCollection = database.collection(enums_1.Collection.Events);
        const eventQuery = [];
        const interestQuery = [];
        const interestIds = {};
        const events = [];
        const stream = {};
        let id;
        let cityId;
        let event;
        let subscriberMax = 0;
        let subscriberCount;
        cityIdsNearby.forEach((nearbyId) => eventQuery.push(eventCollection.where('cityId', '==', nearbyId).get()));
        const eventSnapshots = await Promise.all(eventQuery);
        const time = (new Date()).getTime();
        eventSnapshots.forEach((query) => query.forEach((snapshot) => {
            id = snapshot.id;
            event = snapshot.data();
            event.interests.forEach((interestId) => interestIds[interestId] = interestId);
            events.push(event);
        }));
        Object.keys(interestIds).forEach((interestId) => interestQuery.push(interestCollection.where('id', '==', interestId).get()));
        const interestSnapshots = await Promise.all(interestQuery);
        interestSnapshots.forEach((query) => query.forEach((snapshot) => {
            id = snapshot.id;
            interestSubscribers[id] = snapshot.data().subscriberCount;
            interestCityEvents[id] = {};
        }));
        cityIdsNearby.forEach((cityId) => {
            cityInterests[cityId] = [];
            distanceScores[cityId] = stream_service_1.ServiceStreams.scoreCityDistance(citiesNearby[cityId]);
        });
        events.forEach((event) => {
            id = event.id;
            eventScores[id] = stream_service_1.ServiceStreams.scoreEvent(event, time);
            cityId = event.city.id;
            event.interests.
                filter((interestId) => interestCityEvents[interestId] != null).
                forEach((interestId) => {
                subscriberCount = interestSubscribers[interestId];
                if (interestCityEvents[interestId][cityId] == null) {
                    interestCityEvents[interestId][cityId] = [];
                }
                if (subscriberCount > subscriberMax) {
                    subscriberMax = subscriberCount;
                }
                interestCityEvents[interestId][cityId].push(id);
                cityInterests[cityId].push(interestId);
            });
        });
        let score;
        let interestScore;
        let cityEvents;
        cityId = city.id;
        subscriberMax = subscriberMax === 0 ? 1 : subscriberMax;
        cityIdsNearby.forEach((nearbyId) => {
            cityInterests[nearbyId].forEach((interestId) => {
                subscriberCount = interestSubscribers[interestId];
                cityEvents = interestCityEvents[interestId];
                interestScore = 0;
                Object.keys(cityEvents).forEach((cityIdEvent) => {
                    cityEvents[cityIdEvent].forEach((eventId) => interestScore += eventScores[eventId]);
                    interestScore += (interestScore * distanceScores[cityIdEvent]);
                });
                score = (interestScore * enums_1.GlobalVariable.InterestScoreWeightRaw) +
                    (interestScore * enums_1.GlobalVariable.InterestScoreWeightSubscribers * (subscriberCount / subscriberMax));
                stream[interestId] = { score };
            });
        });
        if (debug) {
            await debugDoc.set({
                citiesNearby,
                cityInterests,
                distanceScores,
                subscriberMax,
                interestCityEvents,
                interestSubscribers,
                eventScores
            });
        }
        return database.collection(enums_1.Collection.Streams).doc(cityId).set(stream);
    }
}
exports.ServiceCities = ServiceCities;
ServiceCities.earthRadius = 6371;
//# sourceMappingURL=cities.services.js.map