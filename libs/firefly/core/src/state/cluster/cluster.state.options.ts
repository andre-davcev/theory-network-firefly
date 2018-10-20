import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateClusterModel } from './cluster.state.model';

export const StateClusterOptions: StoreOptions<StateClusterModel> =
{
    name : 'cluster',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
};
