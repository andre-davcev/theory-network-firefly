import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateStorageModel } from './storage.state.model';
import undefined = require('firebase/empty-import');

export const StateStorageOptions: StoreOptions<StateStorageModel> =
{
    name : 'storage',

    defaults :
    {
        image:  undefined,
        images: {}
    }
};
