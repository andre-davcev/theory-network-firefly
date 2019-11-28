import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateImageModel } from './image.state.model';
import { CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsDefaults } from '@theory/ngxs';

export const StateImageOptions: StoreOptions<StateImageModel> =
{
    name : 'images',

    defaults :
    {
        snapshot  : undefined,
        form      : CoreUtil.clone<FormNgxs>(FormNgxsDefaults),
        formGroup : undefined,

        uploadProgress: 0,
        uploadError:    undefined
    }
};

