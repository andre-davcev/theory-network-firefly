import { StyleOptions } from '@capacitor/status-bar';

import { ActionsDevice } from './device.actions.enum';

export class ActionDeviceInitialize {
  static readonly type = ActionsDevice.DeviceInitialize;
}

export class ActionDeviceStatusBarSet {
  static readonly type = ActionsDevice.StatusBarSet;

  constructor(public payload: StyleOptions) {}
}

export class ActionDeviceStatusBarShow {
  static readonly type = ActionsDevice.StatusBarShow;
}

export class ActionDeviceStatusBarHide {
  static readonly type = ActionsDevice.StatusBarHide;
}
