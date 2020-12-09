import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';

export const StateUserSubscriptionsOptions: StoreOptions<StateUserSubscriptionsModel> =
{
    name : 'userSubscriptions',

    defaults :
    {
        pageSize:         PageSize.Default,
        orderBy:          'name',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        snapshots:      [],
        snapshotLookup: {},
        data:           [],
        dataLookup:     {},

        childLookup : {},
        keys        : [],
        offset      : 0,
        id          : undefined,

        sortFields:
        {
            name        : TypeOf.String,
            dateCreated : TypeOf.String
        }
    }
};
