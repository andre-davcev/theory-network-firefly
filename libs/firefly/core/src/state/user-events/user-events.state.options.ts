import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/ngxs';

import { StateUserEventsModel } from './user-events.state.model';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sortField:     'times.0.start',
        sortAscending: false,
        sortByEntity:  false,
        imageIdKey:    'imageId',

        sortFields:
        {
            name            : TypeOf.String,
            dateCreated     : TypeOf.String,
            'times.0.start' : TypeOf.Number
        }
    }
};
