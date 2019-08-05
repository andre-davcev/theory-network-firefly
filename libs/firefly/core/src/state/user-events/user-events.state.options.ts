import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserEventsModel } from './user-events.state.model';
import { TypeOf } from '@theory/core';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        data:     {},
        lookup:   {},
        list:     [],
        offset:   0,
        pageSize: 30,

        sortFields:
        [
            {
                name:      'name',
                type:      TypeOf.String,
                ascending: true
            }
        ]
    }
};
