import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateUserIconsModel } from './user-icons.state.model';

export const StateUserIconsOptions: StoreOptions<StateUserIconsModel> =
{
    name : 'userIcons',

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
