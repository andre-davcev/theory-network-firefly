import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateCityStreamModel } from './city-stream.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';

export const StateUserStreamOptions: StoreOptions<StateCityStreamModel> =
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

        childLookup : {},
        keys        : [],
        id          : undefined,

        sortFields:
        {
            score : TypeOf.Number
        }
    }
};
