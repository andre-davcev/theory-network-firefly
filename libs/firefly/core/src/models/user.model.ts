import { Model } from '@theory/firebase';

export interface User extends Model
{
    providerId  : string;
    language    : string;
    email       : string;
    phoneNumber : string;
    tokens      : Record<string, string>;
}
