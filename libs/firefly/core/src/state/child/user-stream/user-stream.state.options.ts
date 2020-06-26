import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserStreamModel } from './user-stream.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';

export const StateUserStreamOptions: StoreOptions<StateUserStreamModel> =
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

        snapshots:      [],
        snapshotLookup: {},
        data:           [],
        dataLookup:     {},

        childLookup : {},
        keysSorted  : [],
        offset      : 0,
        id          : undefined,

        sortFields:
        {
            score : TypeOf.Number
        }
    }
};
