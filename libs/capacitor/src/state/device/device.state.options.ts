import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateDeviceModel } from './device.state.model';

export const StateDeviceOptions: StoreOptions<StateDeviceModel> =
{
    name : 'device',

    defaults :
    {
        loading : false,
        device  : false,
        ios     : false,
        android : false
    }
};
