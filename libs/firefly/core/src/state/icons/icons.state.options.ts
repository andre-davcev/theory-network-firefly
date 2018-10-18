import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateIconsModel } from '@firefly/core';

export const StateIconsOptions: StoreOptions<StateIconsModel> =
{
    name : 'icons',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
};
