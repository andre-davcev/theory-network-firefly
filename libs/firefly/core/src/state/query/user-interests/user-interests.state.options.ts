import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserInterestsModel } from './user-interests.state.model';
import { OrderBy } from '@theory/firebase';

export const StateUserInterestsOptions: StoreOptions<StateUserInterestsModel> =
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

        snapshots:      [],
        snapshotLookup: {},
        data:           [],
        dataLookup:     {}
    }
};
