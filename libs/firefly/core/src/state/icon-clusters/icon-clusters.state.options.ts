import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/ngxs';

import { StateIconClustersModel } from './icon-clusters.state.model';

export const StateIconClustersOptions: StoreOptions<StateIconClustersModel> =
{
    name : 'iconClusters',

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
        sortByEntity:  true,
        imageIdKey:    undefined,

        sortFields: {}
    }
};
