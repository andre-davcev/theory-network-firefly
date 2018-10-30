import { firestore, EventContext, Change } from 'firebase-functions';
import 'reflect-metadata';
import { Injectable } from 'injection-js';

import { Util } from '../../theory';
import { CollectionKey } from '../enums';
import { CollectionDefinitions } from '../constants';

@Injectable()
export class EntityUsers
{
    public create()
    {
        return firestore.

        document(`${CollectionKey.Users}/{id}`).
        onCreate((snapshot: firestore.DocumentSnapshot, context: EventContext) =>
        {
            return Util.postCreate(snapshot, context, CollectionDefinitions[CollectionKey.Users].version);
        });
    }

    public update()
    {
        return firestore.

        document(`${CollectionKey.Users}/{id}`).
        onUpdate((change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
        {
            return Util.postUpdate(change, context);
        });
    }
}

