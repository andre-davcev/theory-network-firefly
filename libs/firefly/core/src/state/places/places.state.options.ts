import { StoreOptions } from '@ngxs/store/src/symbols';

import { StatePlacesModel } from './places.state.model';

export const StatePlacesOptions: StoreOptions<StatePlacesModel> =
{
    name : 'places',

    defaults :
    {
        searching : false,
        results   : []
    }
};
