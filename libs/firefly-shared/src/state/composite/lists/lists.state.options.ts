import { StoreOptions } from '@ngxs/store/src/symbols';

import { ListType, TagListDefault } from '../../../enums';
import { StateListsModel } from './lists.state.model';

export const StateListsOptions: StoreOptions<StateListsModel> = {
  name: 'listsStream',

  defaults: {
    filter: {
      type: ListType.Unsubscribed,
      virtual: false,
      subscriptions: {}
    },
    tag: TagListDefault.Popular
  }
};
