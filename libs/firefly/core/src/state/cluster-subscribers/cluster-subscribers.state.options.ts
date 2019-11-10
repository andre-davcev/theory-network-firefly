import { StoreOptions } from '@ngxs/store/src/symbols';

import { Default } from '@theory/ngxs';

import { StateClusterSubscribersModel } from './cluster-subscribers.state.model';

export const StateClusterSubscribersOptions: StoreOptions<StateClusterSubscribersModel> =
{
    name : 'clusterSubscribers',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sortField:     'email',
        sortAscending: true,
        sortByEntity:  true,
        imageIdKey:    undefined,

        sortFields: {}
    }
};
