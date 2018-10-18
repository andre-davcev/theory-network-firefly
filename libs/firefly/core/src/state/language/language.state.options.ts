import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateLanguageModel } from '@firefly/core';

export const StateLanguageOptions: StoreOptions<StateLanguageModel> =
{
    name : 'language',

    defaults :
    {
        language : undefined,
        error    : undefined
    }
};
