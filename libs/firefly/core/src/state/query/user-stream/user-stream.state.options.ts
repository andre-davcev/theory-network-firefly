import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserStreamModel } from './user-stream.state.model';
import { OrderBy, ImageSize } from '@theory/firebase';

export const StateUserStreamOptions: StoreOptions<StateUserStreamModel> =
{
    name : 'userStream',

    defaults :
    {
      pageSize:         PageSize.Default,
      orderBy:          'order',
      orderByDirection: OrderBy.Ascending,

      initialized:    false,
      loading:        false,
      finishedPaging: false,
      imageSize:      ImageSize.Small,

      snapshots:      [],
      snapshotLookup: {},
      data:           [],
      dataLookup:     {}
    }
};
