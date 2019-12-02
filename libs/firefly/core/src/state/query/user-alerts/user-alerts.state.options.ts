import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/ngxs';

import { StateUserAlertsModel } from './user-alerts.state.model';
import { OrderBy, ImageSize } from '@theory/firebase';

export const StateUserAlertsOptions: StoreOptions<StateUserAlertsModel> =
{
    name : 'userAlerts',

    defaults :
    {
        pageSize:         Default.PageSize,
        orderBy:          'dateCreated',
        orderByDirection: OrderBy.Descending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,
        imageSize:      ImageSize.Medium,

        snapshots:      [],
        snapshotLookup: {},
        data:           [],
        dataLookup:     {}
    }
};
