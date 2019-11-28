import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { Default } from '@theory/ngxs';

import { StateUserAlertsModel } from './user-alerts.state.model';

export const StateUserAlertsOptions: StoreOptions<StateUserAlertsModel> =
{
    name : 'userAlerts',

    defaults :
    {
        data:          {},
        lookup:        {},
        keys:          [],
        list:          [],
        offset:        0,
        pageSize:      Default.PageSize,
        initialized:   false,
        sortField:     'dateCreated',
        sortAscending: true,
        sortByEntity:  false,
        imageIdKey:    'imageId',

        sortFields:
        {
            dateCreated : TypeOf.String
        }
    }
};
