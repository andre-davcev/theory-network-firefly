import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from './user.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateUserOptions: StoreOptions<StateUserModel> =
{
    name : 'users',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined,

        authData        : undefined,
        error           : undefined,
        authenticated   : false,
        authenticating  : false,
        initializing    : false
    }
};
