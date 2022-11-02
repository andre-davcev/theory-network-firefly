"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersUpdate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const firestore_1 = require("@google-cloud/firestore");
const library_1 = require("../library");
const database = (0, firebase_admin_1.firestore)();
const UsersUpdate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Users}/{id}`).
    onUpdate(async (change, context) => {
    var _a, _b;
    const updates = [];
    const before = change.before.data();
    const after = change.after.data();
    const subscriptionsStatusBefore = before.subscriptionsStatus;
    const subscriptionsStatusAfter = after.subscriptionsStatus;
    const subscriptionKeysBefore = Object.keys(subscriptionsStatusBefore);
    const subscriptionKeysAfter = Object.keys(subscriptionsStatusAfter);
    const subscriptionCountBefore = subscriptionKeysBefore.length;
    const subscriptionCountAfter = subscriptionKeysAfter.length;
    let status = library_1.Status.Unchanged;
    let interestId;
    const cityIdBefore = ((_a = before.city) === null || _a === void 0 ? void 0 : _a.id) || '';
    const cityIdAfter = ((_b = after.city) === null || _b === void 0 ? void 0 : _b.id) || '';
    if (cityIdBefore !== cityIdAfter) {
        updates.push(library_1.ServiceCities.createIfNew(database, after));
    }
    if (subscriptionCountBefore === subscriptionCountAfter) {
        interestId = subscriptionKeysAfter.find((interestId) => subscriptionsStatusAfter[interestId].on !== subscriptionsStatusBefore[interestId].on);
        status = interestId == null ? library_1.Status.Unchanged : subscriptionsStatusAfter[interestId].on ? library_1.Status.Added : library_1.Status.Removed;
    }
    else if (subscriptionCountBefore < subscriptionCountAfter) {
        interestId = subscriptionKeysAfter.find((interestId) => subscriptionsStatusBefore[interestId] == null);
        status = library_1.Status.Added;
    }
    else if (subscriptionCountBefore > subscriptionCountAfter) {
        interestId = subscriptionKeysBefore.find((interestId) => subscriptionsStatusAfter[interestId] == null);
        status = library_1.Status.Removed;
    }
    if (status === library_1.Status.Added) {
        updates.push(database.collection(library_1.Collection.Interests).doc(interestId).update({ subscriberCount: firestore_1.FieldValue.increment(1) }));
        updates.push(change.after.ref.update({ subscriptions: firestore_1.FieldValue.arrayUnion(interestId) }));
    }
    else if (status === library_1.Status.Removed) {
        updates.push(database.collection(library_1.Collection.Interests).doc(interestId).update({ subscriberCount: firestore_1.FieldValue.increment(-1) }));
        updates.push(change.after.ref.update({ subscriptions: firestore_1.FieldValue.arrayRemove(interestId) }));
    }
    return Promise.all(updates);
});
exports.UsersUpdate = UsersUpdate;
//# sourceMappingURL=update.function.js.map