import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from './user.state.model';
import { UserKey } from '@firefly/core/models';

export const StateUserOptions: StoreOptions<StateUserModel> =
{
    name : 'user',

    defaults :
    {
        authData        : undefined,
        user            : undefined,
        error           : undefined,
        authenticated   : false,
        authenticating  : false,
        initializing    : false,
        form            : undefined,
        clusterMap      : {},
        subscriptionMap : {},
        stream          : [],
        streamLoaded    : false,
        alerts          : [],
        alertsLoaded    : false,

        empty :
        {
            version     : undefined,
            id          : undefined,
            dateCreated : undefined,
            dateUpdated : undefined,

            [UserKey.Uid]              : undefined,
            [UserKey.Language]         : 'en',
            [UserKey.DisplayName]      : undefined,
            [UserKey.Email]            : undefined,
            [UserKey.PhoneNumber]      : undefined,
            [UserKey.PhotoUrl]         : undefined,
            [UserKey.ProviderId]       : undefined,
            [UserKey.Tokens]           : {},
            [UserKey.Notifications]    : {},
            [UserKey.Clusters]         : {},
            [UserKey.Subscriptions]    : {},
            [UserKey.SubscriptionsOff] : {},
            [UserKey.Events]           : {},
            [UserKey.Images]           : {},
            [UserKey.Icons]            : {},
            [UserKey.Stream]           : [],
            [UserKey.Alerts]           : []
        }
    }
};
