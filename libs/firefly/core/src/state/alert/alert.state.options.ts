import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAlertModel } from './alert.state.model';

export const StateAlertOptions: StoreOptions<StateAlertModel> =
{
    name : 'alert',

    defaults :
    {
        entities: {}
    }
};
