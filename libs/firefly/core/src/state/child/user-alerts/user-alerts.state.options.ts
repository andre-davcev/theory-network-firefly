import { StoreOptions } from '@ngxs/store/src/symbols';

import { PageSize } from '@theory/ngxs';

import { StateUserAlertsModel } from './user-alerts.state.model';
import { OrderBy } from '@theory/firebase';
import { TypeOf } from '@theory/core';

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

        snapshots:      [],
        snapshotLookup: {},
        data:           [],
        dataLookup:     {},

        childLookup : {},
        keysSorted  : [],
        offset      : 0,
        id          : undefined,

        sortFields:
        {
            name      : TypeOf.String,
            timeStart : TypeOf.Date
        }
    }
};
