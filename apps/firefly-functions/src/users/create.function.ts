import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { CloudFunction, EventContext, firestore } from 'firebase-functions';
import { Timestamp } from 'firebase/firestore';

import { ServiceCities, ServiceFirestore, Version } from '../library';
import { Collection, User, UserProfile } from '../shared';

const database: Firestore = db();

const UsersCreate: CloudFunction<DocumentSnapshot> = firestore
  .document(`${Collection.Users}/{id}`)
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    const userId: string = snapshot.id;
    const user: User = ServiceFirestore.create<User>(snapshot, Version.Users);

    user.isPublisher = false;
    user.subscriptionsStatus = {};

    user.notifications = {
      default: {
        read: false,
        timeStart: Timestamp.fromDate(new Date('1776-07-04'))
      }
    };

    const userProfile: Partial<UserProfile> = {
      userId,

      nameFirst: '',
      nameLast: '',
      icon: '',
      companyName: '',
      isCompany: false
    };

    return Promise.all([
      snapshot.ref.set(user),
      database
        .collection(Collection.UserProfiles)
        .doc(userId)
        .create(userProfile),
      ServiceCities.createCityIfNew(database, user)
    ]);
  });

export { UsersCreate };
