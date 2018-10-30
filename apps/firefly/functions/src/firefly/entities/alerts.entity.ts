import { firestore, EventContext, Change } from 'firebase-functions';
import 'reflect-metadata';
import { Injectable, Injector } from 'injection-js';

import { CollectionKey } from '../enums';
import { CollectionDefinitions } from '../constants';
import { messaging, firestore as firestoreAdmin } from 'firebase-admin';
import { Util, Config } from '../../@theory-firebase';

@Injectable()
export class EntityAlerts
{
    constructor(private injector: Injector) {}

    public create()
    {
        return firestore.

        document(`${CollectionKey.Alerts}/{id}`).
        onCreate((snapshot: firestore.DocumentSnapshot, context: EventContext) =>
        {
            return Util.postCreate(snapshot, context, CollectionDefinitions[CollectionKey.Users].version);
        });
    }

    public update()
    {
        const config: Config = this.injector.get(Config);

        return firestore.

        document(`${CollectionKey.Alerts}/{id}`).
        onUpdate(async (change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
        {
            const alert: any = change.after.data();
            const alertId: string = context.params.id;

            const payload: any =
            {
                notification:
                {
                    title: alert.title,
                    body: alert.body
                },

                data:
                {
                    alertId
                }
            };


            // ref to the device collection for the user
            const db: firestoreAdmin.Firestore = config.firestore;
            const usersRef: firestoreAdmin.CollectionReference = db.collection('users');

            // Get the user's tokens and send notifications
            const users: firestoreAdmin.QuerySnapshot = await usersRef.get();
            const tokensAll: Array<string> = [];
            let tokens: Array<string>;

            for (const snapshot of users.docs)
            {
                tokens = snapshot.data().tokens;

                if (tokens != null)
                {
                    tokensAll.concat(tokens);
                }
            }

            Util.postUpdate(change, context)

            return messaging().sendToDevice(tokens, payload);
        });
    }
}

