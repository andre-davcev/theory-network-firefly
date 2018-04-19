import {Model} from './model';

export interface User extends Model
{
    uid          : string;
    uidInternal  : string;
    language     : string;
    email?       : string;
    photoURL?    : string;
    phoneNumber? : string;
    displayName? : string;
    providerId?  : string;
}