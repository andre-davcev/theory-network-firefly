import { StoreOptions } from '@ngxs/store/src/symbols';

import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { ListType } from '../../../enums';
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
      type: ListType.Unsubscribed,
      virtual: false,
      subscriptions: {}
    }
  }
};
