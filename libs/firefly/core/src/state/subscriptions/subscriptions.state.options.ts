import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateSubscriptionsModel } from '@firefly/core';

export const StateSubscriptionsOptions: StoreOptions<StateSubscriptionsModel> =
{
    name : 'subscriptions',

    defaults :
    {
        subscriptions : []
    }
};
