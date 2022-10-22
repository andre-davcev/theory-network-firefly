import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { Version, ServiceFirestore, UserProfile, Collection } from '../library';

db();

const UserProfilesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.UserProfiles}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: UserProfile = ServiceFirestore.create<UserProfile>(snapshot, Version.UserProfiles);

    return snapshot.ref.update(object);
});

export { UserProfilesCreate };
