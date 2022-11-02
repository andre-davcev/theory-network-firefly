"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsUpdate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const firebase_functions_2 = require("firebase-functions");
const algoliasearch_1 = require("algoliasearch");
const library_1 = require("../library");
const env = (0, firebase_functions_2.config)();
const client = (0, algoliasearch_1.default)(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');
const database = (0, firebase_admin_1.firestore)();
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