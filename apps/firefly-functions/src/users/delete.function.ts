import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { DocumentSnapshot, Firestore, WriteResult, QuerySnapshot, QueryDocumentSnapshot, CollectionReference, FieldValue } from '@google-cloud/firestore';

import { User, Collection } from '../library';

const database: Firestore = db();

const UsersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Users}/{id}`).
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const interests : CollectionReference = database.collection(Collection.Interests);
    const id        : string              = snapshot.id;
    const user      : User                = snapshot.data() as User;

    const deletes : Array<Promise<WriteResult>> =
    [
        database.collection(Collection.UserProfiles).doc(id).delete()
    ];

    let query : QuerySnapshot;

    query = await database.collection(Collection.Alerts).where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    query = await database.collection(Collection.Interests).where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    query = await database.collection(Collection.Events).where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    user.subscriptions.forEach((interestId: string) =>
        deletes.push(interests.doc(interestId).update({ subscriberCount: FieldValue.increment(-1)}))
    );

    return Promise.all(deletes);
});

export { UsersDelete };
