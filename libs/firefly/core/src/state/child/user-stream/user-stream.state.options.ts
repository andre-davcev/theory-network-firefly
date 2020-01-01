import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserStreamModel } from './user-stream.state.model';
import { OrderBy, ImageSize } from '@theory/firebase';
import { TypeOf } from '@theory/core';

export const StateUserStreamOptions: StoreOptions<StateUserStreamModel> =
{
    name : 'streams',

    defaults :
    {
        pageSize:         10,
        orderBy:          'score',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,
        imageSize:      ImageSize.Medium,

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
