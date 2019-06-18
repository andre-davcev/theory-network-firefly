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
    [UserKey.Notifications] : Record<string, string>;
    [UserKey.Clusters]      : Record<string, string>;
    [UserKey.Subscriptions] : Record<string, string>;
    [UserKey.Events]        : Record<string, string>;
    [UserKey.Images]        : Record<string, string>;
    [UserKey.Icons]         : Record<string, string>;
    [UserKey.Stream]        : Array<string>;
    [UserKey.Alerts]        : Array<string>;
}
