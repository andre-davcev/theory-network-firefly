import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { Timestamp } from '@angular/fire/firestore';

import { ServiceFirestore, Version, ServiceCities, Collection } from '../library';
import { User, UserProfile } from '../shared';

const database: Firestore = db();

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Users}/{id}`).
onCreate(async (snapshot: DocumentSnapshot, context: EventContext) =>
{
    const userId : string = snapshot.id;
    const user   : User   = ServiceFirestore.create<User>(snapshot, Version.Users);

    user.isPublisher         = false;
    user.subscriptionsStatus = {};

    user.notifications =
    {
        default :
        {
            read:      false,
            timeStart: Timestamp.fromDate(new Date('1776-07-04'))
        }
    };

    const userProfile: Partial<UserProfile> =
    {
        userId,

        nameFirst   : '',
        nameLast    : '',
        icon        : '',
        companyName : '',
        isCompany   : false
    };

    return Promise.all
    ([
        snapshot.ref.update({ data: user}),
        database.collection(Collection.UserProfiles).doc(userId).create(userProfile),
        ServiceCities.createIfNew(database, user)
    ]);
});

export { UsersCreate };
