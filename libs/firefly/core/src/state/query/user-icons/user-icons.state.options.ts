import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/ngxs';

import { StateUserIconsModel } from './user-icons.state.model';
import { OrderBy, ImageSize } from '@theory/firebase';

export const StateUserIconsOptions: StoreOptions<StateUserIconsModel> =
{
    name : 'userIcons',

    defaults :
    {
        pageSize:         Default.PageSize,
        orderBy:          'dateCreated',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,
        imageSize:      ImageSize.Small,

        snapshots:      [],
        snapshotLookup: {},
        data:           [],
        dataLookup:     {}
    }
};
