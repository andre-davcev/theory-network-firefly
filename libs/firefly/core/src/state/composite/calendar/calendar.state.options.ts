import { StoreOptions } from '@ngxs/store/src/symbols';

import { EventType } from '@firefly/core/enums';

import { StateCalendarModel } from './calendar.state.model';

export const StateCalendarOptions: StoreOptions<StateCalendarModel> =
{
    name : 'calendar',

    defaults :
    {
        filter :
        {
            type    : EventType.Upcoming,
            virtual : false
        }
    }
};
