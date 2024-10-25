import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

import { StateListModel } from './list.state.model';

export const StateListOptions: StoreOptions<StateListModel> = {
  name: 'lists',

  defaults: {
    snapshot: null,
    form: CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
    formGroup: null,
    events: {},
    eventsPending: {}
  }
};
