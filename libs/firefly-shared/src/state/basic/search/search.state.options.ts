import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateSearchModel } from './search.state.model';

export const StateSearchOptions: StoreOptions<StateSearchModel> =
{
    name : 'search',

    defaults :
    {
      searchResults: []
    }
};
