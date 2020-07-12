import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, DocumentReference, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, Alert, User, UserProfile, ServiceCities, Collection } from '../library';
const database: Firestore = db();

const UsersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Users}/{id}`).
onCreate(async (snapshot: DocumentSnapshot, context: EventContext) =>
{
    const userId : string = snapshot.id;
    const user   : User   = ServiceFirestore.create<User>(snapshot, Version.Users);

    user.isPublisher = false;

    const documentAlert : DocumentReference = database.collection(Collection.Alerts).doc();

    const alert: Partial<Alert> =
    {
        userId,

        name        : 'Your first alert!',
        description : `This is your first alert. Once you subscribe to Firefly Interests found on the home Discover screen, you will receive alerts when new events are posted in each interest!`,
        interests   : [],
        timeStart   : FieldValue.serverTimestamp() as db.Timestamp,
        read        : false,
        website     : 'https://firefly.im'
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
        documentAlert.set(alert),
        ServiceCities.createIfNew(database, user)
    ]);
});

export { UsersCreate };
