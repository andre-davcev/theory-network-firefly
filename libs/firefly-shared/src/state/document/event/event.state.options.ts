import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

import { StateEventModel } from './event.state.model';

export const StateEventOptions: StoreOptions<StateEventModel> = {
  name: 'events',

  defaults: {
    snapshot: null,
    form: CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
    formGroup: null
  }
};
