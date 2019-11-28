import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/ngxs';

import { StateUserImagesModel } from './user-images.state.model';
import { OrderBy, ImageSize } from '@theory/firebase';

export const StateUserImagesOptions: StoreOptions<StateUserImagesModel> =
{
    name : 'userImages',

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
