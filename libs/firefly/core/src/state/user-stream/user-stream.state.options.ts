import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateUserStreamModel } from './user-stream.state.model';

export const StateUserStreamOptions: StoreOptions<StateUserStreamModel> =
{
    name : 'userStream',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sortField:     'order',
        sortAscending: true,
        sortByEntity:  false,
        imageIdKey:    'iconId',

        sortFields:
        {
            order : TypeOf.Number
        }
    }
};
