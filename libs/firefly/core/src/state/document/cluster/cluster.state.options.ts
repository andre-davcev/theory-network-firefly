import { StoreOptions } from '@ngxs/store/src/symbols';
import { StateClusterModel } from './cluster.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateClusterOptions: StoreOptions<StateClusterModel> =
{
    name : 'clusters',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined
    }
};
