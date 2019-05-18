import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateIonicModel } from './ionic.state.model';

export const StateIonicOptions: StoreOptions<StateIonicModel> =
{
    name : 'ionic',

    defaults :
    {
        loading: false
    }
};
