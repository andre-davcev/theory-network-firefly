import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/state';

import { StateEventClustersModel } from './event-clusters.state.model';

export const StateEventClustersOptions: StoreOptions<StateEventClustersModel> =
{
    name : 'eventClusters',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sortField:     'name',
        sortAscending: true,
        sortByEntity:  false,

        sortFields: {}
    }
};
