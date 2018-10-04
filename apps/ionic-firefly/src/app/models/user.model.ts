
import * as firebase from 'firebase/app';

import { Model } from './model';

export interface User extends Model
{
    uid            : string;
    uidInternal    : string;
    language       : string;
    email?         : string;
    photoURL?      : string;
    phoneNumber?   : string;
    displayName?   : string;
    providerId?    : string;
    tokens?        : Record<string, string>;
    notifications? : Record<string, firebase.firestore.DocumentReference>;
}
