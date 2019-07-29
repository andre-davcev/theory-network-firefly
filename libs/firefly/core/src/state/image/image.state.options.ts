import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateImageModel } from './image.state.model';

export const StateImageOptions: StoreOptions<StateImageModel> =
{
    name : 'image',

    defaults :
    {
        upload :
        {
            path     : undefined,
            progress : 0,
            error    : undefined
        },
        events: {}
    }
};
