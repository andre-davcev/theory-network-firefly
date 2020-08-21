import { FirebaseDocument, CityInfo } from '../interfaces';
import { firestore } from 'firebase/app';

import { SubscriptionPartial, AlertPartial } from '../models';
import { MetadataUser } from '../metadata';

export interface User extends FirebaseDocument
{
    city                : CityInfo;
    email               : string;
    isPublisher         : boolean;
    language            : string;
    geopoint            : firestore.GeoPoint;
    notifications       : Record<string, AlertPartial>;
    phoneNumber         : string;
    providerId          : string;
    subscriptions       : Array<string>;
    subscriptionsStatus : Record<string, SubscriptionPartial>;
    tokens              : Array<string>;

    metadata: MetadataUser;
}
