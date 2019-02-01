import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateMapModel } from './map.state.model';

export const StateMapOptions: StoreOptions<StateMapModel> =
{
    name : 'map',

    defaults :
    {
        position : undefined
    }
};
