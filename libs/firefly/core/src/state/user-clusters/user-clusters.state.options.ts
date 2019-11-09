import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/ngxs';

import { StateUserClustersModel } from './user-clusters.state.model';

export const StateUserClustersOptions: StoreOptions<StateUserClustersModel> =
{
    name : 'userClusters',

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
        imageIdKey:    'iconId',

        sortFields:
        {
            name        : TypeOf.String,
            dateCreated : TypeOf.String
        }
    }
};
