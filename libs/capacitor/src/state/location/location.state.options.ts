import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateLocationModel } from './location.state.model';

export const StateLocationOptions: StoreOptions<StateLocationModel> =
{
    name : 'location',

    defaults :
    {
        location : null,
        cityId   : null,
        error    : null
    }
};
