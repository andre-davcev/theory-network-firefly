import { firestore, EventContext, Change } from 'firebase-functions';
import { DocumentSnapshot, Firestore, QuerySnapshot, CollectionReference } from '@google-cloud/firestore';
import 'reflect-metadata';
import { Injectable, Injector } from 'injection-js';

import { Util, Config } from '@theory/firebase/functions';
import { CollectionKey } from '../enums';
import { CollectionDefinitions } from '../constants';
import { Alert } from '@firefly/core';
import { messaging } from 'firebase-admin';

@Injectable()
export class EntityAlerts
{
    constructor(private injector: Injector) {}

    public create()
    {
        return firestore.

        document(`${CollectionKey.Alerts}/{id}`).
        onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
        {
            return Util.postCreate(snapshot, context, CollectionDefinitions[CollectionKey.Users].version);
        });
    }

    public async update()
    {
        const config: Config = this.injector.get(Config);

        return firestore.

        document(`${CollectionKey.Alerts}/{id}`).
        onUpdate(async (change: Change<DocumentSnapshot>, context: EventContext) =>
        {
            const alert: Alert = change.after.data() as Alert;
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
            const db: Firestore = config.firestore;
            const usersRef: CollectionReference = db.collection('users');

            // Get the user's tokens and send notifications
            const users: QuerySnapshot = await usersRef.get();
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

