import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';

export const StateUserSubscriptionsOptions: StoreOptions<StateUserSubscriptionsModel> =
{
    name : 'userSubscriptions',

    defaults :
    {
        loaded : false,
        data   : undefined,
        onMap  : {},
        offMap : {},

        empty :
        {
            on:  {},
            off: {}
        }
    }
};
