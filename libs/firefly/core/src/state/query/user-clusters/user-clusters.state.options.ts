import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/ngxs';

import { StateUserClustersModel } from './user-clusters.state.model';
import { OrderBy, ImageSize } from '@theory/firebase';

export const StateUserClustersOptions: StoreOptions<StateUserClustersModel> =
{
    name : 'userClusters',

    defaults :
    {
        pageSize:         Default.PageSize,
        orderBy:          'name',
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
