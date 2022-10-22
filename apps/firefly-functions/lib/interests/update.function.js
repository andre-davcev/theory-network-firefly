"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsUpdate = void 0;
const firebase_functions_1 = require("firebase-functions");
const library_1 = require("../library");
const functions = require("firebase-functions");
const env = functions.config();
const algoliasearch_1 = require("algoliasearch");
const client = algoliasearch_1.default(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('interests');
const InterestsUpdate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Interests}/{id}`).
    onUpdate(async (change, context) => {
    const data = change.after.data();
    const objectID = change.after.id;
    return index.saveObject(Object.assign(Object.assign({}, data), { objectID }));
});
exports.InterestsUpdate = InterestsUpdate;
//# sourceMappingURL=update.function.js.map