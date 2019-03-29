import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateDateModel } from './date.state.model';

export const StateDateOptions: StoreOptions<StateDateModel> =
{
    name : 'date',

    defaults :
    {
        now:               undefined,
        nowAtPreviousHour: undefined,
        nowAtNextHour:     undefined
    }
};
