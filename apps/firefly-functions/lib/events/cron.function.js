"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsCron = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const library_1 = require("../library");
const EventsCron = firebase_functions_1.runWith({ memory: '2GB', timeoutSeconds: 540 }).
    pubsub.
    schedule('55 * * * *'). // Every hour @ 55 past the hour
    onRun(async (context) => {
    const database = firebase_admin_1.firestore();
    const updates = [];
    const bucket = firebase_admin_1.storage().bucket(library_1.FIREBASE_CONFIG.storageBucket);
    const push = firebase_admin_1.messaging();
    const debugDoc = database.collection(library_1.Collection.Debug).doc(library_1.Collection.Events);
    const debug = false;
    // Get the push notification icon url
    const signedUrlConfig = { action: 'read', expires: '03-09-2491' };
    const signedUrl = await bucket.file('fcm/logo@2x.png').getSignedUrl(signedUrlConfig);
    const icon = signedUrl[0];
    const interestNotifications = {};
    const userNotifications = {};
    const userSnapshots = {};
    const eventPayloads = {};
    let event;
    let eventId;
    let user;
    let userId;
    let notifications;
    // Set the time notify cutoff to the next hour start
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() + 1, 0, 0, 0);
    // Query for events that haven't notified and are less than the cutoff time
    const query = await database.
        collection(library_1.Collection.Events).
        where('notifyComplete', '==', false).
        where('timeNotify', '<=', cutoff).
        where('draft', '==', false).
        get();
    await Promise.all(
    // Iterate over the event query results
    query.docs.map((snapshot) => {
        event = snapshot.data();
        eventId = event.id;
        // Iterate over the interest id's
        event.interests.forEach((interestId) => {
            interestNotifications[interestId] = interestNotifications[interestId] || {};
            // Accumulate interest/event notification partials
            interestNotifications[interestId][eventId] =
                {
                    read: false,
                    timeStart: event.timeStart
                };
        });
        // Update the notifyComplete flag for the event
        updates.push(snapshot.ref.update({ notifyComplete: true }));
        // Get the event small image
        return bucket.
            file(`${library_1.Collection.Events}/${eventId}/${library_1.ImageType.Image}@${library_1.ImageSize.Small}.jpeg`).
            getSignedUrl(signedUrlConfig).
            then((url) => 
        // Save the event payload for later push notification
        eventPayloads[eventId] =
            {
                notification: {
                    title: event.name,
                    body: event.description,
                    icon,
                    image: url[0]
                }
            });
    }));
    // Save the users collection reference
    const usersCollection = database.collection(library_1.Collection.Users);
    await Promise.all(
    // Iterate over the interests
    Object.
        keys(interestNotifications).
        map((interestId) => 
    // Query for users that have the interest subscription
    usersCollection.
        where(library_1.Collection.Subscriptions, 'array-contains', interestId).
        get().
        then((snapshots) => {
        // Get the interest notifications
        notifications = interestNotifications[interestId];
        // Iterate over the user documents
        snapshots.docs.forEach((snapshot) => {
            userId = snapshot.id;
            // Save the user snapshots for later
            userNotifications[userId] = userNotifications[userId] || {};
            userSnapshots[userId] = snapshot;
            // Accumulate notifications mapped to the user
            userNotifications[userId] = Object.assign(Object.assign({}, userNotifications[userId]), notifications);
        });
    })));
    let snapshot;
    let tokens;
    let tokenKeys;
    await Promise.all(
    // Iterate over the user id keys
    Object.
        keys(userSnapshots).
        map((userId) => {
        // Get the snapshot, user and its notifications
        snapshot = userSnapshots[userId];
        user = snapshot.data();
        notifications = userNotifications[userId];
        tokens = user.tokens;
        tokenKeys = Object.keys(tokens);
        // If the user has tokens, then send push notifications to all the devices
        if (tokenKeys.length > 0) {
            Object.
                keys(notifications).
                forEach((eventId) => push.sendToDevice(tokenKeys, eventPayloads[eventId]));
        }
        // Merge the accumulated notifications with the user notifications
        notifications = Object.assign(Object.assign({}, notifications), user.notifications);
        // Update the user object notifications
        return snapshot.ref.update({ notifications });
    }));
    if (debug) {
        await debugDoc.set({
            interestNotifications,
            userNotifications,
            eventPayloads
        });
    }
    // Update the event.notifyComplete actions
    return Promise.all(updates);
});
exports.EventsCron = EventsCron;
//# sourceMappingURL=cron.function.js.map