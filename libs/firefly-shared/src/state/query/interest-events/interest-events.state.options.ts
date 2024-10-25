import { StoreOptions } from '@ngxs/store/src/symbols';

import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { StateListEventsModel } from './list-events.state.model';

export const StateListEventsOptions: StoreOptions<StateListEventsModel> = {
  name: 'listEvents',

  defaults: {
    pageSize: PageSize.Default,
    orderBy: 'name',
    orderByDirection: OrderBy.Ascending,

    initialized: false,
    loading: false,
    finishedPaging: false,

    keys: [],
    snapshotLookup: {},
    dataLookup: {},
    data: []
  }
};
