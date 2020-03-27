import { FirebaseDocument } from '../interfaces';
import { firestore } from 'firebase';

import { Location, SubscriptionPartial } from '../models';

export interface User extends FirebaseDocument
{
    cityId              : string;
    city                : Location;
    email               : string;
    isPublisher         : boolean;
    language            : string;
    geopoint            : firestore.GeoPoint;
    phoneNumber         : string;
    providerId          : string;
    subscriptions       : Array<string>;
    subscriptionsStatus : Record<string, SubscriptionPartial>;
    tokens              : Array<string>;
}
