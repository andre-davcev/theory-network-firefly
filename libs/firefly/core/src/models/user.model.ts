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

    [UserKey.Tokens]        : Array<string>;
    [UserKey.Notifications] : Array<string>;
    [UserKey.Clusters]      : Array<string>;
    [UserKey.Events]        : Array<string>;
    [UserKey.Images]        : Array<string>;
    [UserKey.Icons]         : Array<string>;
}
