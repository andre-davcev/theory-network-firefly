
import { FieldValue, GeoPoint } from 'firebase/firestore';

import { CityInfo } from '../interfaces';
import { AlertPartial } from './alert.document';
import { DocumentBase } from './base.document';
import { SubscriptionPartial } from './subscription.document';

export interface Token
{
    token     : string;
    usedFirst : FieldValue;
    usedLast  : FieldValue;
}

export interface MetadataUser
{

}

export interface User extends DocumentBase
{
    city                : CityInfo;
    email               : string;
    isPublisher         : boolean;
    language            : string;
    geopoint            : GeoPoint;
    notifications       : Record<string, AlertPartial>;
    phoneNumber         : string;
    providerId          : string;
    subscriptions       : Array<string>;
    subscriptionsStatus : Record<string, SubscriptionPartial>;
    tokens              : Record<string, Token>;

    metadata: MetadataUser;
}
