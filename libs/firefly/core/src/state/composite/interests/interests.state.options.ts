import { StoreOptions } from '@ngxs/store/src/symbols';

import { InterestType } from '@firefly/core/enums';

import { StateInterestsModel } from './interests.state.model';

export const StateInterestsOptions: StoreOptions<StateInterestsModel> =
{
    name : 'interestsStream',

    defaults :
    {
        type    : InterestType.Unsubscribed,
        virtual : false
    }
};
