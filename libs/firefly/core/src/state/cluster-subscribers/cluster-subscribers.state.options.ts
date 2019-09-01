import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateClusterSubscribersModel } from './cluster-subscribers.state.model';

export const StateClusterSubscribersOptions: StoreOptions<StateClusterSubscribersModel> =
{
    name : 'clusterSubscribers',

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
