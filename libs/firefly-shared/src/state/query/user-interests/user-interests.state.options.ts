import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserInterestsModel } from './user-interests.state.model';
import { OrderBy } from '@theory/firebase';
import { InterestType } from '@firefly/shared/enums';
import { PageSize } from '@theory/ngxs';

export const StateUserInterestsOptions: StoreOptions<StateUserInterestsModel> =
{
    name : 'userInterests',

    defaults :
    {
        pageSize:         PageSize.MobileCards,
        orderBy:          'name',
        orderByDirection: OrderBy.Ascending,

        initialized:    false,
        loading:        false,
        finishedPaging: false,

        keys:           [],
        snapshotLookup: {},
        dataLookup:     {},
        data:           [],

        filter :
        {
            type          : InterestType.Unsubscribed,
            virtual       : false,
            subscriptions : {}
        }
    }
};
