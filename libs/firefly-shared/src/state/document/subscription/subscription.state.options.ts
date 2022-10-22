import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateSubscriptionModel } from './subscription.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateSubscriptionOptions: StoreOptions<StateSubscriptionModel> =
{
    name : 'subscriptions',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined,
    }
};
