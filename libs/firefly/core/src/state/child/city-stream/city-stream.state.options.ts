import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateCityStreamModel } from './city-stream.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';
import { InterestType } from '@firefly/core/enums';

export const StateCityStreamOptions: StoreOptions<StateCityStreamModel> =
{
    name : 'streams',

    defaults :
    {
        pageSize:         3,
        orderBy:          'score',
        orderByDirection: OrderBy.Descending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        snapshotLookup: {},
        dataLookup:     {},

        childLookup  : {},
        keys         : [],
        keysFiltered : [],
        id           : undefined,
        data         : [],

        sortFields:
        {
            score : TypeOf.Number
        },

        filter :
        {
            type          : InterestType.Unsubscribed,
            virtual       : false,
            subscriptions : {}
        },
        filterSet: false,

        subscriptionsNew: {}
    }
};
