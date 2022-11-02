"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsCreate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const algoliasearch_1 = require("algoliasearch");
const library_1 = require("../library");
const env = (0, firebase_functions_1.config)();
const client = (0, algoliasearch_1.default)(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');
const database = (0, firebase_admin_1.firestore)();
const EventsCreate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Events}/{id}`).
    onCreate(async (snapshot, context) => {
    const object = library_1.ServiceFirestore.create(snapshot, library_1.Version.Events);
    const data = snapshot.data();
    const objectID = snapshot.id;
    return Promise.all([
        snapshot.ref.update({ data: object }),
        library_1.ServiceCities.createIfNew(database, object),
        index.saveObject(Object.assign(Object.assign({}, data), { objectID }))
    ]);
});
exports.EventsCreate = EventsCreate;
//# sourceMappingURL=create.function.js.map