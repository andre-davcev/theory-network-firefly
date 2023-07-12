import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateLanguageModel } from './language.state.model';

export const StateLanguageOptions: StoreOptions<StateLanguageModel> = {
  name: 'language',

  defaults: {
    language: null,
    error: null
  }
};
