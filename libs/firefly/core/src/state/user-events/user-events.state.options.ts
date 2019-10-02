import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateUserEventsModel } from './user-events.state.model';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        data:        {},
        lookup:      {},
        keys:        [],
        list:        [],
        offset:      0,
        pageSize:    Default.PageSize,
        initialized: false,

        sortField:
        {
            name:      'name',
            type:      TypeOf.String,
            ascending: true
        }
    }
};
