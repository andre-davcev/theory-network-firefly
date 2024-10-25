import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { ListType } from '../../../enums';
import { StateCityStreamModel } from './city-stream.state.model';

export const StateCityStreamOptions: StoreOptions<StateCityStreamModel> = {
  name: 'streams',

  defaults: {
    pageSize: PageSize.MobileCards,
    orderBy: 'score',
    orderByDirection: OrderBy.Descending,

    initialized: false,
    loading: false,
    finishedPaging: false,

    snapshotLookup: {},
    dataLookup: {},

    childLookup: {},
    keys: [],
    keysFiltered: [],
    id: '',
    data: [],

    sortFields: {
      score: TypeOf.Number
    },

    filter: {
      type: ListType.Unsubscribed,
      virtual: false,
      subscriptions: {}
    },

    subscriptionsNew: {},
    subscriptionsSet: false,
    cityStreamSet: false
  }
};
