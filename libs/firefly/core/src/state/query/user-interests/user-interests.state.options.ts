import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserInterestsModel } from './user-interests.state.model';
import { OrderBy } from '@theory/firebase';
import { InterestType } from '@firefly/core/enums';

export const StateUserInterestsOptions: StoreOptions<StateUserInterestsModel> =
{
    name : 'userInterests',

    defaults :
    {
        pageSize:         3,
        orderBy:          'name',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        keys:           [],
        snapshotLookup: {},
        dataLookup:     {},

        filter :
        {
            type          : InterestType.Unsubscribed,
            virtual       : false,
            subscriptions : {}
        }
    }
};
