import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateLocationModel } from './location.state.model';

export const StateLocationOptions: StoreOptions<StateLocationModel> =
{
    name : 'location',

    defaults :
    {
        location  :
        {
            coords :
            {
                longitude: -77.594663683890587,
                latitude: 43.127357144138806,
                accuracy: 60
            }
        },

        error : undefined
    }
};
