import { StoreOptions } from '@ngxs/store/src/symbols';

import { InterestType, EventType } from '@firefly/core/enums';

import { StateAppModel } from './app.state.model';

export const StateAppOptions: StoreOptions<StateAppModel> =
{
    name : 'app',

    defaults :
    {
        loading         : false,
        interestType    : InterestType.Unsubscribed,
        interestVirtual : false,
        eventType       : EventType.Upcoming,
        eventVirtual    : false
    }
};
