import { FirebaseDocument } from '../interfaces';
import { firestore } from 'firebase';

import { Location } from '../models';
import { Subscription } from './subscription.model';

export interface User extends FirebaseDocument
{
    city                : Location;
    email               : string;
    language            : string;
    geopoint            : firestore.GeoPoint;
    phoneNumber         : string;
    providerId          : string;
    roleAdmins          : Array<string>;
    roleEditors         : Array<string>;
    subscriptions       : Array<string>;
    subscriptionsStatus : Record<string, Subscription>;
    tokens              : Array<string>;
}
