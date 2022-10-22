"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfilesCreate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
firebase_admin_1.firestore();
const UserProfilesCreate = firebase_functions_1.firestore.
    document(`${library_1.Collection.UserProfiles}/{id}`).
    onCreate(async (snapshot, context) => {
    const object = library_1.ServiceFirestore.create(snapshot, library_1.Version.UserProfiles);
    return snapshot.ref.update(object);
});
exports.UserProfilesCreate = UserProfilesCreate;
//# sourceMappingURL=create.function.js.map