import { StoreOptions } from '@ngxs/store/src/symbols';

import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';
import { PageSize } from '@theory/ngxs';

import { InterestType } from '../../../enums';
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
    id: undefined,
    data: [],

    sortFields: {
      score: TypeOf.Number
    },

    filter: {
      type: InterestType.Unsubscribed,
      virtual: false,
      subscriptions: {}
    },

    subscriptionsNew: {},
    subscriptionsSet: false,
    cityStreamSet: false
  }
};
