import { StoreOptions } from '@ngxs/store/src/symbols';

import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { StateUserInterestsModel } from './user-interests.state.model';
import { InterestType } from '../../../enums';

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
