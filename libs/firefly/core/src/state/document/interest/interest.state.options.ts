import { StoreOptions } from '@ngxs/store/src/symbols';
import { StateInterestModel } from './interest.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateInterestOptions: StoreOptions<StateInterestModel> =
{
    name : 'interests',

    defaults :
    {
        snapshot      : undefined,
        form          : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup     : undefined,
        events        : {},
        eventsPending : {}
    }
};
