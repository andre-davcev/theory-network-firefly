import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';
import { OrderBy } from '@theory/firebase';

import { StateClusterInterestsModel } from './cluster-events.state.model';

export const StateClusterInterestsOptions: StoreOptions<StateClusterInterestsModel> =
{
    name : 'userInterests',

    defaults :
    {
        pageSize:         PageSize.Default,
        orderBy:          'name',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        keys:           [],
        snapshotLookup: {},
        dataLookup:     {},
        data:           []
    }
};
