"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsCron = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
const InterestsCron = firebase_functions_1.runWith({ memory: '2GB', timeoutSeconds: 540 }).
    pubsub.
    schedule('0 2 * * 1'). // Monday's @ 2AM
    onRun(async (context) => {
    const database = firebase_admin_1.firestore();
    const debugDoc = database.collection(library_1.Collection.Debug).doc(library_1.Collection.Streams);
    const debug = true;
    const citiesNearby = {};
    const interestSubscribers = {};
    const interestVirtual = {};
    const eventScores = {};
    const cityInterests = {};
    const citySubscriberMax = {};
    const cityDistanceScore = {};
    const interestCityEvents = {};
    const citiesCollection = {};
    let id;
    let query = await database.collection(library_1.Collection.Interests).where('private', '==', false).get();
    let nearby;
    let interest;
    // Process and save all public interests
    query.forEach((snapshot) => {
        interest = snapshot.data();
        id = snapshot.id;
        interestSubscribers[id] = interest.subscriberCount;
        interestVirtual[id] = interest.virtual;
        interestCityEvents[id] = {};
    });
    query = await database.collection(library_1.Collection.Cities).get();
    // Process and save all cities
    query.forEach((snapshot) => {
        id = snapshot.id;
        citySubscriberMax[id] = 0;
        cityInterests[id] = [];
        cityDistanceScore[id] = {};
        nearby = snapshot.data().nearby;
        citiesNearby[id] = nearby;
        Object.keys(nearby).forEach((cityId) => cityDistanceScore[id][cityId] = library_1.ServiceStreams.scoreCityDistance(nearby[cityId]));
    });
    const time = (new Date()).getTime();
    let city;
    let cityId;
    let event;
    let subscriberCount;
    query = await database.collection(library_1.Collection.Events).where('private', '==', false).get();
    // Process and save all events
    query.forEach((snapshot) => {
        id = snapshot.id;
        event = snapshot.data();
        eventScores[id] = library_1.ServiceStreams.scoreEvent(event, time);
        city = event.city;
        if (city != null) {
            cityId = city.id;
            event.interests.
                filter((interestId) => interestCityEvents[interestId] != null).
                forEach((interestId) => {
                subscriberCount = interestSubscribers[interestId];
                if (interestCityEvents[interestId][cityId] == null) {
                    interestCityEvents[interestId][cityId] = [];
                }
                if (subscriberCount > citySubscriberMax[cityId]) {
                    citySubscriberMax[cityId] = subscriberCount;
                }
                interestCityEvents[interestId][cityId].push(id);
                cityInterests[cityId].push(interestId);
            });
        }
    });
    query = null;
    const collection = database.collection(library_1.Collection.Streams);
    const updates = [];
    let score;
    let interestScore;
    let subscriberMax;
    let distanceScores;
    let cityEvents;
    let cityStream;
    // Process all cities and cities nearby
    Object.keys(citiesNearby).forEach((cityId) => {
        nearby = citiesNearby[cityId];
        distanceScores = cityDistanceScore[cityId];
        cityStream = {};
        subscriberMax = citySubscriberMax[cityId] === 0 ? 1 : citySubscriberMax[cityId];
        Object.keys(nearby).forEach((nearbyId) => {
            cityInterests[nearbyId].forEach((interestId) => {
                subscriberCount = interestSubscribers[interestId];
                cityEvents = interestCityEvents[interestId];
                interestScore = 0;
                Object.keys(cityEvents).forEach((cityIdEvent) => {
                    cityEvents[cityIdEvent].forEach((eventId) => interestScore += eventScores[eventId]);
                    interestScore += (interestScore * distanceScores[cityIdEvent]);
                });
                score = (interestScore * library_1.GlobalVariable.InterestScoreWeightRaw) +
                    (interestScore * library_1.GlobalVariable.InterestScoreWeightSubscribers * (subscriberCount / subscriberMax));
                cityStream[interestId] = { score, virtual: interestVirtual[interestId] };
            });
        });
        citiesCollection[cityId] = cityStream;
        updates.push(collection.doc(cityId).set(cityStream));
    });
    if (debug) {
        const timestamp = (new Date()).toISOString();
        await debugDoc.set({ [timestamp]: {
                citiesNearby,
                citiesCollection,
                cityInterests,
                cityDistanceScore,
                citySubscriberMax,
                interestCityEvents,
                interestSubscribers,
                eventScores
            } });
    }
    return Promise.all(updates);
});
exports.InterestsCron = InterestsCron;
//# sourceMappingURL=cron.function.js.map