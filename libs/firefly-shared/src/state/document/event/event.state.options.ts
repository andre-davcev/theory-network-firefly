import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateEventModel } from './event.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateEventOptions: StoreOptions<StateEventModel> =
{
    name : 'events',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined
    }
};
