import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

import { StateUserModel } from './user.state.model';

export const StateUserOptions: StoreOptions<StateUserModel> = {
  name: 'users',

  defaults: {
    snapshot: null,
    form: CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
    formGroup: null,

    authData: null,
    error: null,
    errorAuth: null,
    authenticating: false,
    initialized: false
  }
};
