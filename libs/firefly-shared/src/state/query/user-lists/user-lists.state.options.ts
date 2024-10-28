import { StoreOptions } from '@ngxs/store/src/symbols';

import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { TagListDefault } from '../../../enums';
import { StateUserListsModel } from './user-lists.state.model';

export const StateUserListsOptions: StoreOptions<StateUserListsModel> = {
  name: 'userLists',

  defaults: {
    pageSize: PageSize.MobileCards,
    orderBy: 'name',
    orderByDirection: OrderBy.Ascending,

    initialized: false,
    loading: false,
    finishedPaging: false,

    keys: [],
    snapshotLookup: {},
    dataLookup: {},
    data: [],

    filter: {
      virtual: false,
      subscriptions: {},
      tag: TagListDefault.Popular
    }
  }
};
