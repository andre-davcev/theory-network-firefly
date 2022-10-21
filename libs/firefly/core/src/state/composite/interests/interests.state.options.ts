import { StoreOptions } from '@ngxs/store/src/symbols';

import { InterestType } from '@firefly/shared/enums';

import { StateInterestsModel } from './interests.state.model';

export const StateInterestsOptions: StoreOptions<StateInterestsModel> =
{
    name : 'interestsStream',

    defaults :
    {
        filter :
        {
            type          : InterestType.Unsubscribed,
            virtual       : false,
            subscriptions : {}
        }
    }
};
