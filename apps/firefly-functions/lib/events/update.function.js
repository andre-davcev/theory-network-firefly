"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsUpdate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
const functions = require("firebase-functions");
const env = functions.config();
const algoliasearch_1 = require("algoliasearch");
const client = algoliasearch_1.default(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');
const database = firebase_admin_1.firestore();
const EventsUpdate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Events}/{id}`).
    onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const data = after;
    const objectID = change.after.id;
    const promises = [];
    if (before.city.id !== after.city.id) {
        promises.push(library_1.ServiceCities.createIfNew(database, after));
    }
    return Promise.all([
        promises,
        index.saveObject(Object.assign(Object.assign({}, data), { objectID }))
    ]);
});
exports.EventsUpdate = EventsUpdate;
//# sourceMappingURL=update.function.js.map