import { FirebaseDocument } from '../interfaces';
import { firestore } from 'firebase';

import { Subscription } from './subscription.model';

export interface User extends FirebaseDocument
{
    cityId              : string;
    dateLoggedIn        : firestore.Timestamp;
    email               : string;
    language            : string;
    location            : firestore.GeoPoint;
    phoneNumber         : string;
    providerId          : string;
    roleAdmins          : Array<string>;
    roleEditors         : Array<string>;
    subscriptions       : Array<string>;
    subscriptionsStatus : Record<string, Subscription>;
    tokens              : Array<string>;
}
