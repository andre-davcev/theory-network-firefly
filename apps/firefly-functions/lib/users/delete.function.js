"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDelete = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const firestore_1 = require("@google-cloud/firestore");
const library_1 = require("../library");
const database = (0, firebase_admin_1.firestore)();
const UsersDelete = firebase_functions_1.firestore.
    document(`${library_1.Collection.Users}/{id}`).
    onDelete(async (snapshot, context) => {
    const interests = database.collection(library_1.Collection.Interests);
    const id = snapshot.id;
    const user = snapshot.data();
    const deletes = [
        database.collection(library_1.Collection.UserProfiles).doc(id).delete()
    ];
    let query;
    query = await database.collection(library_1.Collection.Alerts).where('userId', '==', id).get();
    query.forEach((snapshot) => deletes.push(snapshot.ref.delete()));
    query = await database.collection(library_1.Collection.Interests).where('userId', '==', id).get();
    query.forEach((snapshot) => deletes.push(snapshot.ref.delete()));
    query = await database.collection(library_1.Collection.Events).where('userId', '==', id).get();
    query.forEach((snapshot) => deletes.push(snapshot.ref.delete()));
    user.subscriptions.forEach((interestId) => deletes.push(interests.doc(interestId).update({ subscriberCount: firestore_1.FieldValue.increment(-1) })));
    return Promise.all(deletes);
});
exports.UsersDelete = UsersDelete;
//# sourceMappingURL=delete.function.js.map