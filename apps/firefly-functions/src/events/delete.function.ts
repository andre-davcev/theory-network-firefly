import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { DocumentSnapshot } from '@google-cloud/firestore';

import { ServiceStorage, ImageType } from '../library';
import { Collection } from '../shared';

db();

const EventsDelete: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Events}/{id}`)
  .onDelete(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const bucketPath: string = `${Collection.Events}/${snapshot.id}/${ImageType.Image}.jpeg`;

    return ServiceStorage.delete(bucketPath);
  });

export { EventsDelete };
