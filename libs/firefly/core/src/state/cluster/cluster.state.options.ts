import { StoreOptions } from '@ngxs/store/src/symbols';
import { StateClusterModel } from '@firefly/core';

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
