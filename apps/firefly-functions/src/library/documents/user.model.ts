import { GeoPoint } from '../types';
import { FirebaseDocument, CityInfo, Token } from '../interfaces';
import { SubscriptionPartial, AlertPartial } from '../models';
import { MetadataUser } from '../metadata';

export interface User extends FirebaseDocument
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
