import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateUserImagesModel } from './user-images.state.model';

export const StateUserImagesOptions: StoreOptions<StateUserImagesModel> =
{
    name : 'userImages',

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
