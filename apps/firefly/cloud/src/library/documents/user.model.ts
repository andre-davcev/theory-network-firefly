import { FirebaseDocument } from '../interfaces';
import { firestore } from 'firebase';

import { Subscription } from './subscription.model';

export interface User extends FirebaseDocument
{
    providerId          : string;
    language            : string;
    email               : string;
    phoneNumber         : string;
    location            : firestore.GeoPoint;
    cityId              : string;
    dateLoggedIn        : firestore.Timestamp;
    roleEditors         : Array<string>;
    roleAdmins          : Array<string>;
    subscriptions       : Array<string>;
    subscriptionsStatus : Record<string, Subscription>;
    tokens              : Array<string>;
}
