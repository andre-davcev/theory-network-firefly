import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateImageEventsModel } from './image-events.state.model';

export const StateImageEventsOptions: StoreOptions<StateImageEventsModel> =
{
    name : 'imageEvents',

    defaults :
    {
        data : {}
    }
};
