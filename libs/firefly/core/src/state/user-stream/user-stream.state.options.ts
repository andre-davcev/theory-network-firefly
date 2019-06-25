import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserStreamModel } from './user-stream.state.model';

export const StateUserStreamOptions: StoreOptions<StateUserStreamModel> =
{
    name : 'userStream',

    defaults :
    {
        watching: false,
        loading:  true,
        data:     undefined,
        clusters: [],
        pageSize: 10,
        page:     0,
        paging:   false
    }
};
