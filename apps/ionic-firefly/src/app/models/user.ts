import {Model} from './model';
import * as firebase from 'firebase/app';
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
    tokens?        : {[id: string]: string};
    notifications? : {[id: string]: firebase.firestore.DocumentReference};
}
