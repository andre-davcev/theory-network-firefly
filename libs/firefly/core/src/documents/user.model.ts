import { FirebaseDocument } from '@theory/firebase';
import { firestore } from 'firebase';

import { UserProfile } from '../models';
import { Subscription } from './subscription.model';

export interface User extends FirebaseDocument
{
    providerId  : string;
    language    : string;
    email       : string;
    phoneNumber : string;

    location      : Location;
    dateLoggedIn  : firestore.Timestamp;
    profile       : UserProfile;
    roleEditors   : Record<string, string>;
    roleAdmins    : Record<string, string>;
    subscriptions : Record<string, Subscription>;
    notifications : boolean;
    tokens        : Array<string>;
}
