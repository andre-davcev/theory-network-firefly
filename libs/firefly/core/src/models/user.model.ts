import { Model } from '@theory/firebase';

export interface User extends Model
{
    uid         : string;
    language    : string;
    email       : string;
    photoUrl    : string;
    phoneNumber : string;
    displayName : string;
    providerId  : string;
    tokens      : Record<string, string>;
}
