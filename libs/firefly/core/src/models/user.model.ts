import { DocumentReference } from '@angular/fire/firestore';

import { Model } from '@theory/firebase';

export interface User extends Model
{
    uid            : string;
    uidInternal    : string;
    language       : string;
    email?         : string;
    photoURL?      : string;
    phoneNumber?   : string;
    displayName?   : string;
    providerId?    : string;
    tokens?        : Record<string, string>;
    notifications? : Record<string, DocumentReference>;
}
