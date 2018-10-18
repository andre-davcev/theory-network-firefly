import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateNotificationsModel } from '@firefly/mobile';

export const StateNotificationsOptions: StoreOptions<StateNotificationsModel> =
{
    name : 'notifications',

    defaults :
    {
        notifications : [],
        notification  : undefined
    }
};
