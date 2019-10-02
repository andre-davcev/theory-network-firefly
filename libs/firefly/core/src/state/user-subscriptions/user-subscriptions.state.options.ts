import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/state';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';

export const StateUserSubscriptionsOptions: StoreOptions<StateUserSubscriptionsModel> =
{
    name : 'userSubscriptions',

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
