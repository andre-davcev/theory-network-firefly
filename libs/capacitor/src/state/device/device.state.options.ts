import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateDeviceModel } from './device.state.model';
import { Platform } from '../../enums';

export const StateDeviceOptions: StoreOptions<StateDeviceModel> = {
  name: 'device',

  defaults: {
    platform: Platform.Web,
    loading: false,
    device: false,
    ios: false,
    android: false,

    statusBar: undefined,
    statusBarVisible: false
  }
};
