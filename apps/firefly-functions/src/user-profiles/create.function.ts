import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { DocumentSnapshot } from '@google-cloud/firestore';

import { Version, ServiceFirestore } from '../library';
import { UserProfile, Collection } from '../shared';

db();

const UserProfilesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.UserProfiles}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: UserProfile = ServiceFirestore.create<UserProfile>(snapshot, Version.UserProfiles);

    return snapshot.ref.update({data: object});
});

export { UserProfilesCreate };
