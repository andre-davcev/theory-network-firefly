import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateSubscriptionsModel } from './subscriptions.state.model';

export const StateSubscriptionsOptions: StoreOptions<StateSubscriptionsModel> =
{
    name : 'subscriptions',

    defaults :
    {
        subscriptions : []
    }
};
