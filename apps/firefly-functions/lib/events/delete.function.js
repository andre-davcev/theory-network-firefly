"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsDelete = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
firebase_admin_1.firestore();
const EventsDelete = firebase_functions_1.firestore.
    document(`${library_1.Collection.Events}/{id}`).
    onDelete(async (snapshot, context) => {
    const bucketPath = `${library_1.Collection.Events}/${snapshot.id}/${library_1.ImageType.Image}.jpeg`;
    return library_1.ServiceStorage.delete(bucketPath);
});
exports.EventsDelete = EventsDelete;
//# sourceMappingURL=delete.function.js.map