"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsCreate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
const algoliasearch_1 = require("algoliasearch");
const functions = require("firebase-functions");
const env = functions.config();
const client = algoliasearch_1.default(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('interests');
firebase_admin_1.firestore();
const InterestsCreate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Interests}/{id}`).
    onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    const object = library_1.ServiceFirestore.create(snapshot, library_1.Version.Interests);
    return Promise.all([
        snapshot.ref.update(object),
        index.saveObject(Object.assign(Object.assign({}, data), { objectID }))
    ]);
});
exports.InterestsCreate = InterestsCreate;
//# sourceMappingURL=create.function.js.map