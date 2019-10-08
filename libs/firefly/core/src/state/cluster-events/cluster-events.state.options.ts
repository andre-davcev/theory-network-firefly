import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateClusterEventsModel } from './cluster-events.state.model';

export const StateClusterEventsOptions: StoreOptions<StateClusterEventsModel> =
{
    name : 'clusterEvents',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sort:          'name',
        sortAscending: true,

        sortFields:
        {
            name        : TypeOf.String,
            dateCreated : TypeOf.String
        }
    }
};
