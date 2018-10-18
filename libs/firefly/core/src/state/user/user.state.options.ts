import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from '@firefly/core';

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
        initializing   : false
    }
};
