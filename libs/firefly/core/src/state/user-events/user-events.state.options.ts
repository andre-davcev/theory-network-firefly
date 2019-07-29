import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserEventsModel } from './user-events.state.model';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        data: {}
    }
};
