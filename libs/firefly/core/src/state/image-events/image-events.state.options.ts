import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/ngxs';

import { StateImageEventsModel } from './image-events.state.model';

export const StateImageEventsOptions: StoreOptions<StateImageEventsModel> =
{
    name : 'imageEvents',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sortField:     'name',
        sortAscending: true,
        sortByEntity:  true,
        imageIdKey:    undefined,

        sortFields: {}
    }
};
