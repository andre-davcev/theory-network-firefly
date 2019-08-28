import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserEventsModel } from './user-events.state.model';
import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        data:     {},
        lookup:   {},
        keys:     [],
        list:     [],
        offset:   0,
        pageSize: Default.PageSize,

        sortField:
        {
            name:      'name',
            type:      TypeOf.String,
            ascending: true
        }
    }
};
