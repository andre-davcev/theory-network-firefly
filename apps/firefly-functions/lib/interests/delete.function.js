"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsDelete = void 0;
const firebase_functions_1 = require("firebase-functions");
const firestore_1 = require("@google-cloud/firestore");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
const database = firebase_admin_1.firestore();
const InterestsDelete = firebase_functions_1.firestore.
    document(`${library_1.Collection.Interests}/{id}`).
    onDelete(async (snapshot, context) => {
    const id = snapshot.id;
    const queries = [
        database.collection(library_1.Collection.Events).where(library_1.Collection.Interests, 'array-contains', id).get(),
        database.collection(library_1.Collection.Users).where(library_1.Collection.Subscriptions, 'array-contains', id).get()
    ];
    const updates = [];
    const query = await Promise.all(queries);
    const events = query[0].docs;
    const users = query[1].docs;
    let user;
    events.forEach((snapshot) => updates.push(snapshot.ref.update({ interests: firestore_1.FieldValue.arrayRemove(id) })));
    users.forEach((snapshot) => {
        user = snapshot.data();
        const subscriptionsStatus = user.subscriptionsStatus;
        delete subscriptionsStatus[id];
        updates.push(snapshot.ref.update({
            subscriptions: firestore_1.FieldValue.arrayRemove(id),
            streams: firestore_1.FieldValue.arrayRemove(id),
            subscriptionsStatus
        }));
    });
    await Promise.all(updates);
    const bucketPath = `${library_1.Collection.Interests}/${id}/${library_1.ImageType.Image}.jpeg`;
    return library_1.ServiceStorage.delete(bucketPath);
});
exports.InterestsDelete = InterestsDelete;
//# sourceMappingURL=delete.function.js.map