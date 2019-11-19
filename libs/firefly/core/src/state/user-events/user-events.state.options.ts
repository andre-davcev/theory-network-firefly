import { StoreOptions } from '@ngxs/store/src/symbols';
import { Default } from '@theory/ngxs';

import { StateUserEventsModel } from './user-events.state.model';
import { ImageSize, OrderBy } from '@theory/firebase';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        service:          undefined,
        query:            undefined,
        pageSize:         Default.PageSize,
        orderBy:          'timeStart',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        finishedPaging: false,
        imageSize:      ImageSize.Small,

        snapshots:      [],
        snapshotLookup: {},
        list:           []
    }
};
