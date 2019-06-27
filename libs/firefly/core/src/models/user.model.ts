import { Model } from '@theory/firebase';

export interface User extends Model
{
    uid           : string;
    language      : string;
    email         : string;
    photoUrl      : string;
    phoneNumber   : string;
    displayName   : string;
    providerId    : string;

    tokens           : Record<string, string>;
    notifications    : Record<string, string>;
    clusters         : Record<string, string>;
    subscriptions    : Record<string, string>;
    subscriptionsOff : Record<string, string>;
    events           : Record<string, string>;
    images           : Record<string, string>;
    icons            : Record<string, string>;
    stream           : Array<string>;
    alerts           : Array<string>;
}
