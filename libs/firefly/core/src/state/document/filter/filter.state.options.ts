import { StoreOptions } from '@ngxs/store/src/symbols';

import { InterestType, EventType } from '@firefly/core/enums';

import { StateFilterModel } from './filter.state.model';

export const StateFilterOptions: StoreOptions<StateFilterModel> =
{
    name : 'filter',

    defaults :
    {
        interestType    : InterestType.Unsubscribed,
        interestVirtual : false,
        eventType       : EventType.Upcoming,
        eventVirtual    : false
    }
};
