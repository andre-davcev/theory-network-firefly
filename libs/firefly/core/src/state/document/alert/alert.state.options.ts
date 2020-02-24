import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAlertModel } from './alert.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateAlertOptions: StoreOptions<StateAlertModel> =
{
    name : 'alerts',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined
    }
};
