import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, QuerySnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore';

import { User, SubscriptionPartial, Collection, ImageType, ServiceStorage } from '../library';

const database: Firestore = db();

const InterestsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Interests}/{id}`).
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id: string = snapshot.id;

    const queries: Array<Promise<QuerySnapshot>> =
    [
        database.collection(Collection.Events).where(Collection.Interests,    'array-contains', id).get(),
        database.collection(Collection.Users).where(Collection.Subscriptions, 'array-contains', id).get()
    ];

    const updates: Array<Promise<WriteResult>> = [];

    const query: Array<QuerySnapshot> = await Promise.all(queries);

    const events: Array<QueryDocumentSnapshot> = query[0].docs;
    const users:  Array<QueryDocumentSnapshot> = query[1].docs;

    let user: User;

    events.forEach((snapshot: QueryDocumentSnapshot) =>
        updates.push(snapshot.ref.update({ interests: FieldValue.arrayRemove(id) }))
    );

    users.forEach((snapshot: QueryDocumentSnapshot) =>
    {
        user = snapshot.data() as User;

        const subscriptionsStatus: Record<string, SubscriptionPartial> = user.subscriptionsStatus;

        delete subscriptionsStatus[id];

        updates.push(snapshot.ref.update
        ({
            subscriptions : FieldValue.arrayRemove(id),
            streams       : FieldValue.arrayRemove(id),

            subscriptionsStatus
        }))
    });

    await Promise.all(updates);

    const bucketPath: string = `${Collection.Interests}/${id}/${ImageType.Image}.jpeg`;

    return ServiceStorage.delete(bucketPath);
});

export { InterestsDelete };
