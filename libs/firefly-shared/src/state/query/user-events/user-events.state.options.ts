import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { OrderBy } from '@theory/firebase';

import { EventType } from '../../../enums';
import { StateUserEventsModel } from './user-events.state.model';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> = {
  name: 'userEvents',

  defaults: {
    pageSize: 12,
    orderBy: 'timeEnd',
    orderByDirection: OrderBy.Ascending,
    orderByType: TypeOf.Timestamp,

    initialized: false,
    loading: false,
    finishedPaging: false,

    keys: [],
    snapshotLookup: {},
    dataLookup: {},
    data: [],

    filter: {
      type: EventType.Upcoming,
      virtual: false
    }
  }
};
