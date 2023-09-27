import {
  CollectionReference,
  DocumentSnapshot,
  FieldValue,
  Firestore,
  WriteResult
} from '@google-cloud/firestore';
import { auth, firestore as db } from 'firebase-admin';
import { CloudFunction, EventContext, firestore } from 'firebase-functions';

import { Collection, User } from '../shared';

const database: Firestore = db();

const UsersDelete: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Users}/{id}`)
  .onDelete(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const interests: CollectionReference = database.collection(
      Collection.Interests
    );
    const id: string = snapshot.id;
    const user: User = snapshot.data() as User;

    const authenticated: auth.Auth = auth();

    // delete auth user
    await authenticated.deleteUser(id);

    const deletes: Array<Promise<WriteResult>> = [
      // user-profiles
      database.collection(Collection.UserProfiles).doc(id).delete()
    ];

    /*
    // interests
    let query: QuerySnapshot;

    query = await database
      .collection(Collection.Interests)
      .where('userId', '==', id)
      .get();
    query.forEach((snapshot: QueryDocumentSnapshot) =>
      deletes.push(snapshot.ref.delete())
    );
*/

    /*
    // events
    query = await database
      .collection(Collection.Events)
      .where('userId', '==', id)
      .get();
    query.forEach((snapshot: QueryDocumentSnapshot) =>
      deletes.push(snapshot.ref.delete())
    );
*/
    // interests/id/subscriberCount
    user.subscriptions.forEach((interestId: string) =>
      deletes.push(
        interests
          .doc(interestId)
          .update({ subscriberCount: FieldValue.increment(-1) })
      )
    );

    return Promise.all(deletes);
  });

export { UsersDelete };
