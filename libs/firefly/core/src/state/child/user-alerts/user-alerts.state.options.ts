import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserAlertsModel } from './user-alerts.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';
import { EventType } from '@firefly/core/enums';

export const StateUserAlertsOptions: StoreOptions<StateUserAlertsModel> =
{
    name : 'userAlerts',

    defaults :
    {
        pageSize:         PageSize.Default,
        orderBy:          'timeStart',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        snapshotLookup: {},
        dataLookup:     {},

        childLookup : {},
        keys        : [],
        id          : undefined,
        data        : [],

        sortFields:
        {
            name      : TypeOf.String,
            timeStart : TypeOf.Timestamp
        },

        filter :
        {
            type    : EventType.Upcoming,
            virtual : false
        }
    }
};
