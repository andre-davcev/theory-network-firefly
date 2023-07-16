import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

import { StateInterestModel } from './interest.state.model';

export const StateInterestOptions: StoreOptions<StateInterestModel> = {
  name: 'interests',

  defaults: {
    snapshot: null,
    form: CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
    formGroup: null,
    events: {},
    eventsPending: {}
  }
};
