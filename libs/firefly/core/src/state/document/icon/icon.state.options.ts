import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateIconModel } from './icon.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateIconOptions: StoreOptions<StateIconModel> =
{
    name : 'icons',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined,

        dataUri : null
    }
};
