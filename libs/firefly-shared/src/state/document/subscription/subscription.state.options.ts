import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

import { StateSubscriptionModel } from './subscription.state.model';

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
