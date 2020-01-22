import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult, QuerySnapshot, QueryDocumentSnapshot, CollectionReference, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { User } from '../library';

const database: Firestore = db();

const UsersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('users/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const interests : CollectionReference = database.collection('clusters');
    const id        : string              = snapshot.id;
    const user      : User                = snapshot.data() as User;

    const deletes : Array<Promise<WriteResult>> =
    [
        database.collection('user-profiles').doc(id).delete()
    ];

    let query : QuerySnapshot;

    query = await database.collection('alerts').where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    query = await database.collection('clusters').where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    query = await database.collection('events').where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    query = await database.collection('icons').where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    query = await database.collection('images').where('userId', '==', id).get();
    query.forEach((snapshot: QueryDocumentSnapshot) => deletes.push(snapshot.ref.delete()));

    user.subscriptions.forEach((interestId: string) =>
        deletes.push(interests.doc(interestId).update({ subscriberCount: FieldValue.increment(-1)}))
    );

    return Promise.all(deletes);
});

export { UsersDelete };
