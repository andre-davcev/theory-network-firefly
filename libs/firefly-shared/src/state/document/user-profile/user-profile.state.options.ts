import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

import { StateUserProfileModel } from './user-profile.state.model';

export const StateUserProfileOptions: StoreOptions<StateUserProfileModel> =
{
    name : 'userProfiles',

    defaults :
    {
        snapshot  : null,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : null
    }
};
