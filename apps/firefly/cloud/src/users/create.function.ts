import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, User, UserProfile, ServiceCities, Collection } from '../library';
const database: Firestore = db();

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Users}/{id}`).
onCreate(async (snapshot: DocumentSnapshot, context: EventContext) =>
{
    const userId : string = snapshot.id;
    const user   : User   = ServiceFirestore.create<User>(snapshot, Version.Users);

    user.isPublisher = false;

    user.notifications =
    {
        default :
        {
            read:      false,
            timeStart: db.Timestamp.fromDate(new Date('1776-07-04'))
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
        snapshot.ref.update(user),
        database.collection(Collection.UserProfiles).doc(userId).create(userProfile),
        ServiceCities.createIfNew(database, user)
    ]);
});

export { UsersCreate };
