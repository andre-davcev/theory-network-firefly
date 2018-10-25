import { firestore, EventContext, Change } from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import 'reflect-metadata';
import { Injectable } from 'injection-js';

import { Util } from '@theory/firebase/functions';
import { CollectionKey } from '../enums';
import { CollectionDefinitions } from '../constants';

@Injectable()
export class EntityClusters
{
    public create()
    {
        return firestore.

        document(`${CollectionKey.Clusters}/{id}`).
        onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
        {
            const searchableIndex: Record<string, boolean> = Util.createIndex(snapshot.data().name);

            return Util.postCreate(snapshot, context, CollectionDefinitions[CollectionKey.Users].version, { searchableIndex });
        });
    }

    public update()
    {
        return firestore.

        document(`${CollectionKey.Clusters}/{id}`).
        onUpdate((change: Change<DocumentSnapshot>, context: EventContext) =>
        {
            return Util.postUpdate(change, context);
        });
    }
}

