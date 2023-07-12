import { StoreOptions } from '@ngxs/store/src/symbols';

import { Platform } from '../../enums';
import { StateDeviceModel } from './device.state.model';

export const StateDeviceOptions: StoreOptions<StateDeviceModel> = {
  name: 'device',

  defaults: {
    platform: Platform.Web,
    loading: false,
    device: false,
    ios: false,
    android: false,

    statusBar: null,
    statusBarVisible: false
  }
};
