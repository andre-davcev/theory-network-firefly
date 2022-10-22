import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserEventsModel } from './user-events.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';
import { EventType } from '@firefly/shared/enums';

export const StateUserEventsOptions: StoreOptions<StateUserEventsModel> =
{
    name : 'userEvents',

    defaults :
    {
        pageSize         : 12,
        orderBy          : 'timeStart',
        orderByDirection : OrderBy.Ascending,
        orderByType      : TypeOf.Timestamp,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        keys:           [],
        snapshotLookup: {},
        dataLookup:     {},
        data:           [],

        filter :
        {
            type    : EventType.Upcoming,
            virtual : false
        }
    }
};
