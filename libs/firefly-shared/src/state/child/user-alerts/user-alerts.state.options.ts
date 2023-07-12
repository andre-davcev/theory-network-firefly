import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { EventType } from '../../../enums';
import { StateUserAlertsModel } from './user-alerts.state.model';

export const StateUserAlertsOptions: StoreOptions<StateUserAlertsModel> = {
  name: 'userAlerts',

  defaults: {
    pageSize: PageSize.Default,
    orderBy: 'timeStart',
    orderByDirection: OrderBy.Ascending,

    initialized: false,
    loading: false,
    finishedPaging: false,

    snapshotLookup: {},
    dataLookup: {},

    childLookup: {},
    keys: [],
    id: undefined,
    data: [],

    sortFields: {
      name: TypeOf.String,
      timeStart: TypeOf.Timestamp
    },

    filter: {
      type: EventType.Upcoming,
      virtual: false
    }
  }
};
