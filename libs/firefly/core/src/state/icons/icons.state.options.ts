import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateIconsModel } from './icons.state.model';

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
