"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.createCluster = functions.firestore
    .document('clusters/{clusterId}')
    .onCreate(event => {
    const version = "1.0.0";
    const clusterId = event.id;
    const cluster = event.data();
    const searchableIndex = createIndex(cluster.name);
    const indexedCluster = Object.assign({}, cluster, { searchableIndex });
    const db = admin.firestore();
    // Create a document reference
    var docRef = db.collection('clusters').doc(clusterId);
    // Update the timestamp field with the value from the server
    var updateTimestamp = docRef.update({
        dateCreated: admin.firestore.FieldValue.serverTimestamp(),
        dateUpdated: admin.firestore.FieldValue.serverTimestamp(),
        v: version
    });
    return db.collection('clusters').doc(clusterId).set(indexedCluster, { merge: true });
});
exports.updateCluster = functions.firestore
    .document('clusters/{clusterId}')
    .onUpdate(change => {
    admin.firestore().collection('cluster').doc(change.after.id)
        .update({
        dateUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
});
function createIndex(title) {
    const arr = title.toLowerCase().split('');
    const searchableIndex = {};
    let prevKey = '';
    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true;
        prevKey = key;
    }
    return searchableIndex;
}
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map