import { DocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { CloudFunction, EventContext, firestore } from 'firebase-functions';

import { ServiceFirestore, Version } from '../library';
import { Collection, UserProfile } from '../shared';

db();

const UserProfilesCreate: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.UserProfiles}/{id}`)
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const object: UserProfile = ServiceFirestore.create<UserProfile>(
      snapshot,
      Version.UserProfiles
    );

    return snapshot.ref.set(object);
  });

export { UserProfilesCreate };
