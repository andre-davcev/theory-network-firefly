import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentSnapshot } from '@google-cloud/firestore';

admin.initializeApp(functions.config().firebase);

exports.createCluster = functions.firestore
.document('clusters/{clusterId}')
.onCreate(event => {

    const version = "1.0.0"
    const clusterId = event.id;
    const cluster = event.data();

    const searchableIndex = createIndex(cluster.name)

    const indexedCluster = { ...cluster, searchableIndex }

    const db = admin.firestore()

    // Create a document reference
    const docRef = db.collection('clusters').doc(clusterId);

    // Update the timestamp field with the value from the server
    const updateTimestamp = docRef.update({
        dateCreated: admin.firestore.FieldValue.serverTimestamp(),
        dateUpdated: admin.firestore.FieldValue.serverTimestamp(),
        v: version
    });


    return db.collection('clusters').doc(clusterId).set(indexedCluster, { merge: true })

})

exports.updateCluster = functions.firestore
.document('clusters/{clusterId}')
.onUpdate(change => {
    admin.firestore().collection('cluster').doc(change.after.id)
    .update({
            dateUpdated : admin.firestore.FieldValue.serverTimestamp()
    });
})

function createIndex(title) {
    const arr = title.toLowerCase().split('');
    const searchableIndex = {}

    let prevKey = '';

    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true
        prevKey = key
    }

    return searchableIndex
}

// ToDo: Uncomment these

/*
exports.userCreate = functions.firestore.
document('users/{tokenId}').
onCreate((snapshot: DocumentSnapshot, context: functions.EventContext) => {
    const timestamp: admin.firestore.FieldValue = admin.firestore.FieldValue.serverTimestamp();

    return snapshot.ref.update({
        dateCreated: timestamp,
        dateUpdated: timestamp
    });
});

exports.userUpdate = functions.firestore.
document('users/{tokenId}').
onUpdate(async (change: functions.Change<DocumentSnapshot>, context: functions.EventContext) => {
    return change.before.ref.update({
        dateUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
});

exports.notificationCreate = functions.firestore.
document('notifications/{notificationId}').
onCreate((snapshot: DocumentSnapshot, context: functions.EventContext) => {
    return snapshot.ref.update({
        id: snapshot.id,
        dateCreated: admin.firestore.FieldValue.serverTimestamp()
    });
});

exports.notificationPush = functions.firestore.
document('notifications/{notificationId}').
onUpdate(async (change: functions.Change<DocumentSnapshot>, context: functions.EventContext) => {
    const notification: Notification = change.after.data() as Notification;
    const notificationId: string = context.params.notificationId;
    const eventId: number = notification.eventId;

    // Notification content
    let payload: any = {
        notification: {
            title: notification.title,
            body: notification.body
        },

        data: {
            notificationId
        }
    };

    if (eventId != null) {
        payload.data.eventId = '' + eventId;
    }

    // ref to the device collection for the user
    const firestore: FirebaseFirestore.Firestore = admin.firestore();
    const usersRef: FirebaseFirestore.CollectionReference = firestore.collection('users');

    // Get the user's tokens and send notifications
    const users: FirebaseFirestore.QuerySnapshot = await usersRef.get();
    const tokens: Array<string> = users.docs.map((snapshot: FirebaseFirestore.QueryDocumentSnapshot) => snapshot.data().id);

    return admin.messaging().sendToDevice(tokens, payload);
});
*/
