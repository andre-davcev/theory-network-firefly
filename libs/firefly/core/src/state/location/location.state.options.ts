import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateLocationModel } from '@firefly/core';

export const StateLocationOptions: StoreOptions<StateLocationModel> =
{
    name : 'location',

    defaults :
    {
        location  : undefined,
        error     : undefined
    }
};
