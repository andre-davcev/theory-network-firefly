import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAlertsModel } from './alerts.state.model';

export const StateAlertsOptions: StoreOptions<StateAlertsModel> =
{
    name : 'alerts',

    defaults :
    {
        index : 0
    }
};
