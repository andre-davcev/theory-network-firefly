import {
  DocumentSnapshot,
  FieldValue,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult
} from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { CloudFunction, EventContext, firestore } from 'firebase-functions';

import { ImageType, ServiceStorage } from '../library';
import { Collection, SubscriptionPartial, User } from '../shared';

const database: Firestore = db();

const ListsDelete: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Lists}/{id}`)
  .onDelete(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const id: string = snapshot.id;

    const queries: Array<Promise<QuerySnapshot>> = [
      database
        .collection(Collection.Events)
        .where(Collection.Lists, 'array-contains', id)
        .get(),
      database
        .collection(Collection.Users)
        .where(Collection.Subscriptions, 'array-contains', id)
        .get()
    ];

    const updates: Array<Promise<WriteResult>> = [];

    const query: Array<QuerySnapshot> = await Promise.all(queries);

    const events: Array<QueryDocumentSnapshot> = query[0].docs;
    const users: Array<QueryDocumentSnapshot> = query[1].docs;

    let user: User;

    events.forEach((snapshot: QueryDocumentSnapshot) =>
      updates.push(snapshot.ref.update({ lists: FieldValue.arrayRemove(id) }))
    );

    users.forEach((snapshot: QueryDocumentSnapshot) => {
      user = snapshot.data() as User;

      const subscriptionsStatus: Record<string, SubscriptionPartial> =
        user.subscriptionsStatus;

      delete subscriptionsStatus[id];

      updates.push(
        snapshot.ref.update({
          subscriptions: FieldValue.arrayRemove(id),
          streams: FieldValue.arrayRemove(id),

          subscriptionsStatus
        })
      );
    });

    await Promise.all(updates);

    const bucketPath: string = `${Collection.Lists}/${id}/${ImageType.Image}.jpeg`;

    return ServiceStorage.delete(bucketPath);
  });

export { ListsDelete };
