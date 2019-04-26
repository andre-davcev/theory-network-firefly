import { DocumentReference } from '@angular/fire/firestore';

import { Model } from '@theory/firebase';

import { UserKey } from './user.model.key';

export interface User extends Model
{
    [UserKey.Uid]           : string;
    [UserKey.Language]      : string;
    [UserKey.Email]         : string;
    [UserKey.PhotoUrl]      : string;
    [UserKey.PhoneNumber]   : string;
    [UserKey.DisplayName]   : string;
    [UserKey.ProviderId]    : string;
    [UserKey.Tokens]        : Record<string, string>;
    [UserKey.Notifications] : Record<string, DocumentReference>;

    [UserKey.Clusters] : Record<string, DocumentReference>;
    [UserKey.Events]   : Record<string, DocumentReference>;
    [UserKey.Images]   : Record<string, DocumentReference>;
    [UserKey.Icons]    : Record<string, DocumentReference>;
}
