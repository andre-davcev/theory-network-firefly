import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAlertModel } from '@firefly/core';

export const StateAlertOptions: StoreOptions<StateAlertModel> =
{
    name : 'alert',

    defaults :
    {
        entities: {}
    }
};
