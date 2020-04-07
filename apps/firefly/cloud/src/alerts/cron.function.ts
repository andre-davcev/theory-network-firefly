import { runWith, EventContext } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { QuerySnapshot, QueryDocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { User, Alert, Collection } from '../library';
import admin = require('firebase-admin');

const storage = admin.storage();
const AlertsCron =

runWith( { memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('0 2 * * 1'). // Monday's @ 2AM
onRun(async (context: EventContext) =>
{
    const database            : Firestore                      = firestore();
    const userAlerts          : Record<string, Array<Alert>>   = {};

    let id     : string;
    let query  : QuerySnapshot = await database.collection(Collection.Alerts).get();

    query.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        const alert = snapshot.data() as Alert;
        if(!userAlerts[alert.userId])
          userAlerts[alert.userId] = new Array();

        console.log('user ID: ' + alert.userId);

        userAlerts[alert.userId].push((snapshot.data() as Alert));
    });

    Object.keys(userAlerts).forEach(async (userId: string) => {
      console.log('getting userID: ' + userId);
      query = await database.collection(Collection.Users).where('userId', '==', userId).get();

      query.forEach((snapshot: QueryDocumentSnapshot) => {
        const user = snapshot.data() as User;
        console.log('found user: ' + user.id);
        const alerts: Array<Alert> = userAlerts[user.userId];

        alerts.forEach(async alert => {
          console.log('before bucket:');
          const bucket = storage.bucket('project-4334231676697990915.appspot.com');
          const file = bucket.file(alert.bucketPath);

          let fileUrl = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
          });

          const payload = {
            notification: {
              title: alert.name,
              body: alert.description,
              icon: 'https://firebasestorage.googleapis.com/v0/b/project-4334231676697990915.appspot.com/o/FCMImages%2Flogo%402x.png?alt=media&token=1046a940-9018-4184-976f-c192da3e236c',
              image: fileUrl[0]
            }
          }

          if(user.tokens != null && user.tokens.length > 0)
          admin.messaging().sendToDevice(user.tokens, payload);

        })
      })
    })
});

export { AlertsCron };
