import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserIconsModel } from './user-icons.state.model';
import { OrderBy } from '@theory/firebase';

export const StateUserIconsOptions: StoreOptions<StateUserIconsModel> =
{
    name : 'userIcons',

    defaults :
    {
        pageSize:         PageSize.Default,
        orderBy:          'dateCreated',
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
