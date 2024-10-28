import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { TagListDefault } from '../../../enums';
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
      virtual: false,
      subscriptions: {},
      tag: TagListDefault.Popular
    },

    subscriptionsNew: {},
    subscriptionsSet: false,
    cityStreamSet: false
  }
};
