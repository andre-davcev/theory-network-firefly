import { StoreOptions } from '@ngxs/store/src/symbols';

import { TagListDefault } from '../../../enums';
import { StateListsModel } from './lists.state.model';

export const StateListsOptions: StoreOptions<StateListsModel> = {
  name: 'listsStream',

  defaults: {
    filter: {
      virtual: false,
      subscriptions: {},
      tag: TagListDefault.Popular
    },
    tag: null
  }
};
