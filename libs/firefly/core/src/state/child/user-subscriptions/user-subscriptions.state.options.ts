import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';
import { InterestType } from '@firefly/core/enums';

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

        snapshotLookup: {},
        dataLookup:     {},

        childLookup : {},
        keys        : [],
        id          : undefined,

        sortFields:
        {
            name        : TypeOf.String,
            dateCreated : TypeOf.String
        },

        filter :
        {
            type          : InterestType.Unsubscribed,
            virtual       : false,
            subscriptions : {}
        }
    }
};
