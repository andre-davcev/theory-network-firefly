import { StoreOptions } from '@ngxs/store/src/symbols';

import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { StateInterestEventsModel } from './interest-events.state.model';

export const StateInterestEventsOptions: StoreOptions<StateInterestEventsModel> =
  {
    name: 'interestEvents',

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
