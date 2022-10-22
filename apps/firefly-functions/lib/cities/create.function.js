"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesCreate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
const database = firebase_admin_1.firestore();
const CitiesCreate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Cities}/{id}`).
    onCreate(async (snapshot, context) => {
    const object = library_1.ServiceFirestore.create(snapshot, library_1.Version.Cities);
    const id = object.id;
    const geopoint = object.geopoint;
    const promises = [];
    const cities = await database.collection(library_1.Collection.Cities).get();
    const nearby = { [id]: 0 };
    cities.forEach((snapshot) => {
        const city = snapshot.data();
        if (id !== snapshot.id) {
            const distance = library_1.ServiceCities.distanceBetweenPoints(geopoint, city.geopoint);
            if (distance <= library_1.GlobalVariable.DistanceThreshold) {
                nearby[city.id] = distance;
                city.nearby[id] = distance;
                promises.push(snapshot.ref.update({ nearby: city.nearby }));
            }
        }
    });
    object.nearby = nearby;
    object.userId = library_1.GlobalVariable.UserAdmin;
    return Promise.all([
        snapshot.ref.update(object),
        library_1.ServiceCities.generateStream(database, object)
    ]);
});
exports.CitiesCreate = CitiesCreate;
//# sourceMappingURL=create.function.js.map