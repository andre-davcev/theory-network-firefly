import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from './user.state.model';
import { ModelKey } from '@theory/firebase';
import { UserKey } from '@firefly/core/models';

export const StateUserOptions: StoreOptions<StateUserModel> =
{
    name : 'user',

    defaults :
    {
        authData       : undefined,
        user           : undefined,
        error          : undefined,
        authenticated  : false,
        authenticating : false,
        initializing   : false,
        form           : undefined,

        empty :
        {
            [ModelKey.Version]     : undefined,
            [ModelKey.Id]          : undefined,
            [ModelKey.DateCreated] : undefined,
            [ModelKey.DateUpdated] : undefined,

            [UserKey.Uid]           : undefined,
            [UserKey.Language]      : 'en',
            [UserKey.DisplayName]   : undefined,
            [UserKey.Email]         : undefined,
            [UserKey.PhoneNumber]   : undefined,
            [UserKey.PhotoUrl]      : undefined,
            [UserKey.ProviderId]    : undefined,
            [UserKey.Tokens]        : [],
            [UserKey.Notifications] : [],
            [UserKey.Clusters]      : [],
            [UserKey.Events]        : [],
            [UserKey.Images]        : [],
            [UserKey.Icons]         : []
        }
    }
};
