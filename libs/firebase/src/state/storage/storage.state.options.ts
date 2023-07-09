import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateStorageModel } from './storage.state.model';

export const StateStorageOptions: StoreOptions<StateStorageModel> = {
  name: 'storage',

  defaults: {
    images: {},

    uploadProgress: 0,
    uploadError: undefined
  }
};
