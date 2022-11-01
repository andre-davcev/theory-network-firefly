import { runWith, EventContext } from 'firebase-functions';
import { firestore, storage, messaging } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { GetSignedUrlResponse, GetSignedUrlConfig } from '@google-cloud/storage';

import { Event, Collection, User, ImageType, ImageSize, AlertPartial, FIREBASE_CONFIG, Token } from '../library';

const EventsCron =

runWith({ memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('55 * * * *'). // Every hour @ 55 past the hour
onRun(async (context: EventContext) =>
{
    const database  : Firestore                   = firestore();
    const updates   : Array<Promise<WriteResult>> = [];
    const bucket    : any                         = storage().bucket(FIREBASE_CONFIG.storageBucket);
    const push      : messaging.Messaging         = messaging();

    const debugDoc : firestore.DocumentReference = database.collection(Collection.Debug).doc(Collection.Events);
    const debug    : boolean                     = false;

    // Get the push notification icon url
    const signedUrlConfig : GetSignedUrlConfig   = { action: 'read', expires: '03-09-2491'};
    const signedUrl       : GetSignedUrlResponse = await bucket.file('fcm/logo@2x.png').getSignedUrl(signedUrlConfig);
    const icon            : string               = signedUrl[0];

    const interestNotifications : Record<string, Record<string, AlertPartial>> = {};
    const userNotifications     : Record<string, Record<string, AlertPartial>> = {};
    const userSnapshots         : Record<string, QueryDocumentSnapshot>        = {};
    const eventPayloads         : Record<string, messaging.MessagingPayload>   = {};

    let event:         Event;
    let eventId:       string;
    let user:          User;
    let userId:        string;
    let notifications: Record<string, AlertPartial>;

    // Set the time notify cutoff to the next hour start
    const cutoff: Date = new Date();
    cutoff.setHours(cutoff.getHours() + 1, 0, 0, 0);

    // Query for events that haven't notified and are less than the cutoff time
    const query: QuerySnapshot = await database.
        collection(Collection.Events).
        where('notifyComplete', '==', false).
        where('timeNotify', '<=', cutoff).
        where('draft', '==', false).
        get();

    await Promise.all
    (
        // Iterate over the event query results
        query.docs.map((snapshot: QueryDocumentSnapshot) =>
        {
            event   = snapshot.data() as Event;
            eventId = event.id;

            // Iterate over the interest id's
            event.interests.forEach((interestId: string) =>
            {
                interestNotifications[interestId] = interestNotifications[interestId] || {};

                // Accumulate interest/event notification partials
                interestNotifications[interestId][eventId] =
                {
                    read      : false,
                    timeStart : event.timeStart
                };
            });

            // Update the notifyComplete flag for the event
            updates.push(snapshot.ref.update({ notifyComplete: true }));

            // Get the event small image
            return bucket.
                file(`${Collection.Events}/${eventId}/${ImageType.Image}@${ImageSize.Small}.jpeg`).
                getSignedUrl(signedUrlConfig).
                then((url: GetSignedUrlResponse) =>
                    // Save the event payload for later push notification
                    eventPayloads[eventId] =
                    {
                        notification :
                        {
                            title : event.name,
                            body  : event.description,
                            icon,
                            image: url[0]
                        }
                    }
                );
        })
    );

    // Save the users collection reference
    const usersCollection: firestore.CollectionReference = database.collection(Collection.Users);

    await Promise.all
    (
        // Iterate over the interests
        Object.
        keys(interestNotifications).
        map((interestId: string) =>
            // Query for users that have the interest subscription
            usersCollection.
            where(Collection.Subscriptions, 'array-contains', interestId).
            get().
            then((snapshots: QuerySnapshot) =>
            {
                // Get the interest notifications
                notifications = interestNotifications[interestId];

                // Iterate over the user documents
                snapshots.docs.forEach((snapshot: QueryDocumentSnapshot) =>
                {
                    userId = snapshot.id;

                    // Save the user snapshots for later
                    userNotifications[userId] = userNotifications[userId] || {};
                    userSnapshots[userId]     = snapshot;

                    // Accumulate notifications mapped to the user
                    userNotifications[userId] =
                    {
                        ...userNotifications[userId],
                        ...notifications
                    };
                });
            })
        )
    );

    let snapshot  : QueryDocumentSnapshot;
    let tokens    : Record<string, Token>;
    let tokenKeys : Array<string>;

    await Promise.all
    (
        // Iterate over the user id keys
        Object.
        keys(userSnapshots).
        map((userId: string) =>
        {
            // Get the snapshot, user and its notifications
            snapshot      = userSnapshots[userId];
            user          = snapshot.data() as User;
            notifications = userNotifications[userId];
            tokens        = user.tokens;
            tokenKeys     = Object.keys(tokens);

            // If the user has tokens, then send push notifications to all the devices
            if (tokenKeys.length > 0)
            {
                Object.
                    keys(notifications).
                    forEach((eventId: string) =>
                        push.sendToDevice(tokenKeys, eventPayloads[eventId])
                    );
            }

            // Merge the accumulated notifications with the user notifications
            notifications =
            {
                ...notifications,
                ...user.notifications
            };

            // Update the user object notifications
            return snapshot.ref.update({ notifications });
        })
    );

    if (debug)
    {
        await debugDoc.set
        ({
            interestNotifications,
            userNotifications,
            eventPayloads
        });
    }

    // Update the event.notifyComplete actions
    return Promise.all(updates);
});

export { EventsCron };
