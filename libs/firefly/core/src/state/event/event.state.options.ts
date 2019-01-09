import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'event',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
};
