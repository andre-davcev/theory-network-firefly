
import { GeoPoint } from '@angular/fire/firestore';

import { FirebaseDocument, CityInfo, Token } from '../../library/interfaces';
import { SubscriptionPartial, AlertPartial } from '../../library/models';
import { MetadataUser } from '../../library/metadata';

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
