import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserEventsModel } from './user-events.state.model';
import { DataType } from '@theory/core';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        data: {},
        list: [],

        sort:
        [
            {
                name:      'name',
                type:      DataType.String,
                ascending: true
            }
        ]
    }
};
